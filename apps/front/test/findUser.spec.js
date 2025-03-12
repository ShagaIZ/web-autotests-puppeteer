import puppeteer from "puppeteer";
import { expect } from "chai";
import { MainPage } from "../page/mainPage.js";

describe("Поиск юзера", function () {
  let browser;
  let page;
  let mainPage;

  this.timeout(5000);

  this.beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto("https://gh-users-search.netlify.app/");
    mainPage = new MainPage(page);
  });

  this.afterEach(async () => {
    await browser.close();
  });
 

  it("Ввести логин юзера, нажать на поиск-> юзер найден", async () => {
    await mainPage.findUser("ShagaIZ");
    await page.waitForSelector('img[alt="Ilyas  Shagaleev"]', {
      timeout: 5000,
    });
    expect(await mainPage.getInnertext(mainPage.userBlock)).to.match(
      /Ilyas\s+Shagaleev/
    );
  });
});
