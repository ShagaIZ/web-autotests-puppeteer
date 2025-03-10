import puppeteer from "puppeteer";
import { expect } from "chai";
import { MainPage } from "../page/mainPage.js";

describe("Проверка элементов", function () {
  let browser;
  let page;
  let mainPage;

  this.timeout(3000); // Таймайт для стабильности тестов

  this.beforeAll(async () => {
    browser = await puppeteer.launch({ headless: true }); // Запуск браузера
    page = await browser.newPage(); // Открытие новой страницы
    await page.goto("https://gh-users-search.netlify.app/");
    mainPage = new MainPage(page); // Создание объекта страницы
  });

  after(async () => {
    await browser.close(); // Закрытие браузера
  });
  it('Элементы страницы(основные) -> отображается хедер, блок, поле поиска и кнопка поиска ', async () => {
    expect(await mainPage.getElement(mainPage.headerBlock)).to.be.true;
    expect(await mainPage.getElement(mainPage.searchBlock)).to.be.true;
    expect(await mainPage.getElement(mainPage.searchField)).to.be.true;
    expect(await mainPage.getElement(mainPage.searchButton)).to.be.true;
  });
});
