import puppeteer from "puppeteer";
import { expect } from "chai";
import { BaseAPI } from "../helpers/baseAPI.js";
import { getUrlApi, PATH } from "../../../common/url.js";

describe("Получения информации по кол-ву друзей существующего аккаунта", function () {
  let browser;
  let page;
  let baseAPI;
  let response 
  this.beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    baseAPI = new BaseAPI(page);
    response = await baseAPI.sendRequest(getUrlApi(PATH.USERS, "ShagaIZ", '/followers?per_page=100'));
  });

  this.afterEach(async () => {
    await browser.close();
  });
  it("Статус ответа и кол-во друзей -> статус 200, 2 друга", async () => {
    expect(response.status).to.equal(200);
    expect(response.body.length).to.equal(2)
  });
 
});

