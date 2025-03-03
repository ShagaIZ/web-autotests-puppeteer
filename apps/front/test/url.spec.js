
import puppeteer from 'puppeteer';
import { expect } from 'chai';


describe('Проверка корректности урла', function() {
  let browser;
  let page;
  this.timeout(3000); // Таймайт для стабильности тестов

  before(async () => {
    browser = await puppeteer.launch({ headless: false }); // Запуск браузера
    page = await browser.newPage();  // Открытие новой страницы
  });

  after(async () => {
    await browser.close();  // Закрытие браузера
  });
  it('Перейти на страницу -> корректный урл', async () => {
    await page.goto('https://gh-users-search.netlify.app/'); 
    expect(await page.url()).to.equal('https://gh-users-search.netlify.app/'); 
  });
});
