import puppeteer from "puppeteer";
import { expect } from "chai";
import { BaseAPI } from "../helpers/baseAPI.js";
import { validUserResponse, notFoundUserResponse } from "../data/response.js";
import { getUrlApi, PATH } from "../../../common/url.js";

describe("Получения информации по существующему аккаунту", function () {
  let browser;
  let page;
  let baseAPI;
  let response 
  this.beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    baseAPI = new BaseAPI(page);
    response = await baseAPI.sendRequest(getUrlApi(PATH.USERS, "ShagaIZ"));
  });

  this.afterEach(async () => {
    await browser.close();
  });
  it("Статус ответа и наличие полей -> статус 200, поля корректны", async () => {
    expect(response.status).to.equal(200);
    validUserResponse.requiredFields.forEach((field) => {
      expect(response.body).to.have.property(field);
    });
  });
  it("Тип данных в значениях полей -> строка и числа", async () => {
 
    validUserResponse.stringFields.forEach((field) => {
      expect(response.body[field]).to.be.a("string");
    });

    validUserResponse.numberFields.forEach((field) => {
      expect(response.body[field]).to.be.a("number");
    });

    validUserResponse.booleanFields.forEach((field) => {
      expect(response.body[field]).to.be.a("boolean");
    });

    validUserResponse.nullableFields.forEach((field) => {
      expect(response.body[field]).to.be.a("null");
    });
  });
});

describe("Получения информации по НЕ существующему аккаунту", function () {
  let browser;
  let page;
  let baseAPI;
  let response

  this.beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    baseAPI = new BaseAPI(page);
     response = await baseAPI.sendRequest(getUrlApi(PATH.USERS, "ShagaIZ111222333"));
  });

  this.afterEach(async () => {
    await browser.close();
  });
  it("Статус ответа и наличие полей-> статус 404, поля корректны", async () => {
 
    expect(response.status).to.equal(404);
  
    notFoundUserResponse.fields.forEach((field) => {
      expect(response.body).to.have.property(field);
    });
  });
  it("Тип данных в значениях полей -> строка и числа", async () => {

    notFoundUserResponse.fields.forEach((field) => {
      expect(response.body[field]).to.be.a("string");
    });
;
  });
  
});