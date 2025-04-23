import puppeteer from "puppeteer";
import { expect } from "chai";
import { BaseAPI } from "../helpers/baseAPI.js";
import { getUrlApi, PATH } from "../../../common/url.js";

describe("Получения информации по репозиторию существующего аккаунта", function () {
  let browser;
  let page;
  let baseAPI;
  let response 
  this.beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    baseAPI = new BaseAPI(page);
    response = await baseAPI.sendRequest(getUrlApi(PATH.USERS, "ShagaIZ", '/repos'));
  });

  this.afterEach(async () => {
    await browser.close();
  });
  it("Статус ответа и кол-во репозиториев -> статус 200, 8 репозиториев", async () => {
    expect(response.status).to.equal(200);
    expect(response.body.length).to.equal(8)
  });
 
});

