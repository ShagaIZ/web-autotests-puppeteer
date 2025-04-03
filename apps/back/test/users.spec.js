import puppeteer from "puppeteer";
import { expect } from "chai";
import { BaseAPI } from "../helpers/baseAPI.js";
import { userResponse } from "../data/response.js";
import { getUrlApi, PATH } from "../../../common/url.js";

describe("Получения информации по существующему аккаунту", function () {
  let browser;
  let page;
  let baseAPI;
  this.timeout(7000);

  this.beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    baseAPI = new BaseAPI(page);
  });

  this.afterEach(async () => {
    await browser.close();
  });
  it("Статус ответа и наличие полей -> статус 200, поля корректны", async () => {
    let response = await baseAPI.sendRequest(getUrlApi(PATH.USERS, "ShagaIZ"));
    expect(response.status).to.equal(200);

    userResponse.requiredFields.forEach((field) => {
      expect(response.body).to.have.property(field);
    });
  });
  it("Тип данных в значениях полей -> строка и числа", async () => {
    let response = await baseAPI.sendRequest(getUrlApi(PATH.USERS, "ShagaIZ"));
    expect(response.status).to.equal(200);

    userResponse.stringFields.forEach((field) => {
      expect(response.body[field]).to.be.a("string");
    });

    userResponse.numberFields.forEach((field) => {
      expect(response.body[field]).to.be.a("number");
    });

    userResponse.booleanFields.forEach((field) => {
      expect(response.body[field]).to.be.a("boolean");
    });

    userResponse.nullableFields.forEach((field) => {
      expect(response.body[field]).to.be.a("null");
    });
  });
});
