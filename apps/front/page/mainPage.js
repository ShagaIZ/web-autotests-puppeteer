export class MainPage {
  constructor(page) {
    this.page = page;
    this.headerBlock = ".sc-iBYQkv.fzziLf";
    this.searchBlock = ".form-control";
    this.searchField = '[data-testid="search-bar"]';
    this.searchButton = '[type="submit"]';
  }
  async getElement(element) {
    return await this.page.$eval(element, () => true).catch(() => false); 
  }
}
