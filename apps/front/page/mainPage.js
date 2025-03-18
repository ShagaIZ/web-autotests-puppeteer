export class MainPage {
  constructor(page) {
    this.page = page;
    this.headerBlock = ".sc-iBYQkv.fzziLf";
    this.searchBlock = ".form-control";
    this.searchField = '[data-testid="search-bar"]';
    this.searchButton = 'button[type="submit"]';
    this.userBlock = '[class="sc-dkrFOg bHWDWn"]';
    this.followers = '[class="followers"]'
    this.summaryBlock = '[class="sc-bcXHqe cSGkzu section-center"]'
    this.avatar = '[src="https://avatars.githubusercontent.com/u/97968096?v=4"]'
    this.itemSummary = '[class="item"]'
    
  }
  async getElement(element) {
    return await this.page.$eval(element, () => true).catch(() => false); 
  }
  async findUser(name){
    await this.page.locator(this.searchField).fill(name)
    await this.page.locator(this.searchButton).click()
    
  }

  async getInnertext(element){
    return await this.page.$eval(element, el => el.innerText);
  }
  async getSummaryItemText(nth){
   let items = await this.page.$$(this.itemSummary);
   return await this.page.evaluate(el => el.innerText, items[nth]);
  }
}
