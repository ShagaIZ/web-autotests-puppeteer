import puppeteer from "puppeteer";
import { expect } from "chai";
import { BaseAPI } from "../helpers/baseAPI.js";
import { rateResponse } from "../data/response.js";
import { getUrlApi, PATH } from "../../../common/url.js";

describe("Получения информации по rate", function () {
  let browser;
  let page;
  let baseAPI;
  let response


  this.beforeEach(async () => {
    browser = await puppeteer.launch({ headless: true });
    page = await browser.newPage();
    baseAPI = new BaseAPI(page);
    response = await baseAPI.sendRequest(getUrlApi(PATH.RATE));
  });

  this.afterEach(async () => {
    await browser.close();
  });
  it("Статус и наличие полей -> статус 200, поля корректны", async () => {
 
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("resources");
    expect(response.body.resources).to.have.property("graphql");
    rateResponse.requiredFields.forEach((field) => {
      expect(response.body.resources.graphql).to.have.property(field);
    });
    expect(response.body.resources).to.have.property("integration_manifest");
    rateResponse.requiredFields.forEach((field) => {
      expect(response.body.resources.integration_manifest).to.have.property(
        field
      );
    });
    expect(response.body.resources).to.have.property("search");
    rateResponse.requiredFields.forEach((field) => {
      expect(response.body.resources.search).to.have.property(field);
    });
    expect(response.body).to.have.property("rate");
    rateResponse.requiredFields.forEach((field) => {
      expect(response.body.rate).to.have.property(field);
    });
  });
  it("Тип данных в значених -> строка и числа", async () => {
    rateResponse.numberFields.forEach((field) => {
      expect(response.body.resources.core[field]).to.be.a("number");
    });
    rateResponse.numberFields.forEach((field) => {
      expect(response.body.resources.graphql[field]).to.be.a("number");
    });
    rateResponse.numberFields.forEach((field) => {
      expect(response.body.resources.integration_manifest[field]).to.be.a(
        "number"
      );
    });
    rateResponse.numberFields.forEach((field) => {
      expect(response.body.resources.search[field]).to.be.a("number");
    });
    rateResponse.numberFields.forEach((field) => {
      expect(response.body.rate[field]).to.be.a("number");
    });
    Object.values(response.body.resources).forEach((resource) => {
      rateResponse.stringFields.forEach((field) => {
        expect(resource[field]).to.be.a("string");
      });
    });
  });
});
