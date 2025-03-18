export class BaseAPI {
  constructor(page) {
    this.page = page;
  }

  async sendRequest(url) {
    return await this.page.evaluate(async (url) => {
      const res = await fetch(url);
      const status = res.status;
      const body = await res.json();
      return { status, body };
    }, url);
  }
}
