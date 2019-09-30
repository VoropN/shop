import { SearchModel } from "./search.model";
import { SearchView } from "./search.view";

export class SearchController {
  constructor() {
    this.searchModel = new SearchModel();
    this.searchView = new SearchView();
    this.init();
  }
  init() {
    this.searchView.inputSeach(this.getProductForSearch.bind(this));
  }
  getProductForSearch(category, input) {
    return this.searchModel.getProductForSearch(category, input).then(data => this.searchView.render(data));
  }
}