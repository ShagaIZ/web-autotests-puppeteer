import puppeteer from "puppeteer";
import { expect } from "chai";
import { MainPage } from "../page/mainPage.js";

describe("Проверка элементов", function () {
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
  it("Элементы страницы(основные) без поиска юзера -> отображается хедер, блок, поле поиска и кнопка поиска ", async () => {
    expect(await mainPage.getElement(mainPage.headerBlock)).to.be.true;
    expect(await mainPage.getElement(mainPage.searchBlock)).to.be.true;
    expect(await mainPage.getElement(mainPage.searchField)).to.be.true;
    expect(await mainPage.getElement(mainPage.searchButton)).to.be.true;
    expect(await mainPage.getElement(mainPage.userBlock)).to.be.true;
    expect(await mainPage.getElement(mainPage.followers)).to.be.true;
    expect(await mainPage.getElement(mainPage.summuryBlock)).to.be.true;
  });
});
