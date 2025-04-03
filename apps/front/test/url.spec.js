
import puppeteer from 'puppeteer';
import { expect } from 'chai';
import { BASE_URL_FRONT } from '../../../common/url.js';


describe('Проверка корректности урла', function() {
  let browser;
  let page;
  this.timeout(7000); 

  this.beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true }); 
    page = await browser.newPage();  
    await page.goto(BASE_URL_FRONT); 
  });

  this.afterEach(async () => {
    await browser.close();  
  });
  it('Перейти на страницу -> корректный урл', async () => {
    expect(await page.url()).to.equal(BASE_URL_FRONT); 
  });
  it('Перейти на страницу -> урл содержит подстроку', async () => {
    expect(await page.url()).to.contain('gh-users-search');
  });
  it('Перейти на страницу -> домен корректный', async () => {
    expect(await page.url()).to.match(/^https:\/\/gh-users-search\.netlify\.app/);
  });
 
});
