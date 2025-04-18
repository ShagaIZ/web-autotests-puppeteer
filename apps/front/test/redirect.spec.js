import puppeteer from "puppeteer";
import { expect } from "chai";
import { MainPage } from "../page/mainPage.js";
import { BASE_URL_FRONT } from "../../../common/url.js";



describe("Переходы на другие сервисы", function () {
  let browser;
  let page;
  let mainPage;

  this.timeout(15000);

  this.beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true});
    page = await browser.newPage();
    await page.goto(BASE_URL_FRONT);
    mainPage = new MainPage(page);
    await mainPage.findUser("ShagaIZ");
    await page.waitForSelector('img[alt="Ilyas  Shagaleev"]', {
      timeout: 5000,
    });
  });

  this.afterEach(async () => {
    await browser.close();
  });

  it("Нажать на кнопку 'Flollow' -> переход в аккаунт найденного юзера", async () => {
    const [response] = await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 10000 }),
      mainPage.clickLinkButton(mainPage.followButtonFindUser)
    ]);

    expect(page.url()).to.include("github.com/ShagaIZ")
  });
  it("Перети на страницу друга -> переход в аккаунт друга", async () => {
    const [response] = await Promise.all([
      page.waitForNavigation({ waitUntil: "domcontentloaded", timeout: 10000 }),
      mainPage.clickLinkButton(mainPage.linkButtonFriend)
    ]);

    expect(page.url()).to.include("github.com/volkhe")
  });
});
