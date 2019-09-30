import { SearchModel } from "./search.model";
import { SearchView } from "./search.view";

export class SearchController {
  constructor(output, filterOpition) {
    this.searchModel = new SearchModel();
    this.searchView = new SearchView(output, filterOpition);
  }
  getProductForSearch(data, filterOption) {
    return this.searchModel.getProductForSearch(data, filterOption);
  }
}