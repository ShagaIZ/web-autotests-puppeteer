import puppeteer from "puppeteer";
import { expect } from "chai";
import { MainPage } from "../page/mainPage.js";

describe("Проверка основыных элементов страницы", function () {
  let browser;
  let page;
  let mainPage;

  this.timeout(6000);

  this.beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto("https://gh-users-search.netlify.app/");
    mainPage = new MainPage(page);
  });

  this.afterEach(async () => {
    await browser.close();
  });
  it("Наличие элементов -> отображается хедер, блок, поле поиска и кнопка поиска ", async () => {
    expect(await mainPage.getElement(mainPage.headerBlock)).to.be.true;
    expect(await mainPage.getElement(mainPage.searchBlock)).to.be.true;
    expect(await mainPage.getElement(mainPage.searchField)).to.be.true;
    expect(await mainPage.getElement(mainPage.searchButton)).to.be.true;
    expect(await mainPage.getElement(mainPage.userBlock)).to.be.true;
    expect(await mainPage.getElement(mainPage.followers)).to.be.true;
    expect(await mainPage.getElement(mainPage.summaryBlock)).to.be.true;
  });

  it("Текст в хедере -> отображается текст 'Welcome'", async () => {
    expect(await mainPage.getInnertext(mainPage.headerBlock)).to.match(
      /Welcome/
    );
  });
  it("Текст в кнопке поиска -> отображается текст 'Search'", async () => {
    expect(await mainPage.getInnertext(mainPage.searchButton)).to.match(
      /Search/
    );
  });
  it("Плейсхолдер поле поиска -> отображается текст 'enter github user name'", async () => {
    const input = await page.$(`${mainPage.searchField}`);
    const placeholderProperty = await input.getProperty("placeholder");
    const placeholder = await placeholderProperty.jsonValue();
    expect(placeholder).to.equal("enter github user name");
  });
});

describe("Проверка элементов с найденным юзером", function () {
  let browser;
  let page;
  let mainPage;

  this.timeout(6000);

  this.beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    await page.goto("https://gh-users-search.netlify.app/");
    mainPage = new MainPage(page);
    await mainPage.findUser("ShagaIZ");
    await page.waitForSelector('img[alt="Ilyas  Shagaleev"]', {
      timeout: 5000,
    });
  });

  this.afterEach(async () => {
    await browser.close();
  });

  it("Элемент 'Repos' -> отображается текст 'Repos' с кол-во 8", async () => {
    expect(await mainPage.getSummaryItemText(0)).to.match(/\b8\b\s*\bRepos\b/);
  });
  it("Элемент 'Followers' -> отображается текст 'Followers' с кол-во 2", async () => {
    expect(await mainPage.getSummaryItemText(1)).to.match(
      /\b2\b\s*\bFollowers\b/
    );
  });
  it("Элемент 'Following' -> отображается текст 'Following' с кол-во 3", async () => {
    expect(await mainPage.getSummaryItemText(2)).to.match(
      /\b3\b\s*\bFollowing\b/
    );
  });
  it("Элемент 'Gists' -> отображается текст 'Gists' с кол-во 0", async () => {
    expect(await mainPage.getSummaryItemText(3)).to.match(
      /\b0\b\s*\bGists\b/
    );
  });
});
