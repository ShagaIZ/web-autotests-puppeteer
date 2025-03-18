import puppeteer from "puppeteer";
import { expect } from "chai";
import { BaseAPI } from "../helpers/baseAPI.js";

describe("Получения информации по rate", function () {
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
  it.only("Валидный запрос, статус и наличие полей -> статус 200, поля корректны", async () => {
    const fieldInObjects = ["limit", "remaining", "reset", "used", "resource"];
    let response = await baseAPI.sendRequest(
      "https://api.github.com/rate_limit"
    );
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("resources");
    expect(response.body.resources).to.have.property("graphql");
    fieldInObjects.forEach((field) => {
      expect(response.body.resources.graphql).to.have.property(field);
    });
    expect(response.body.resources).to.have.property("integration_manifest");
    fieldInObjects.forEach((field) => {
      expect(response.body.resources.integration_manifest).to.have.property(
        field
      );
    });
    expect(response.body.resources).to.have.property("search");
    fieldInObjects.forEach((field) => {
      expect(response.body.resources.search).to.have.property(field);
    });
    expect(response.body).to.have.property("rate");
    fieldInObjects.forEach((field) => {
      expect(response.body.rate).to.have.property(field);
    });
  });
});
