import { SearchModel } from './search.model';
import { SearchView } from './search.view';

export class SearchController {
  constructor(options) {
    this.options = options;
    this.searchModel = new SearchModel();
    this.searchView = new SearchView();
    this.init();
  }
  init() {
    this.searchView.inputSeach(this.updateSearch.bind(this), this.updateProduct.bind(this));
    this.options.eventManager.subscribe(`productsFor${this.options.subscribe}`, (dataCards) => this.filterProductsBySearch(dataCards));
  }
  filterProductsBySearch(dataCards) {
    let newDataCards = this.searchModel.filterProductsBySearch(dataCards, this.search);
    this.options.eventManager.publish(`productsFor${this.options.publish}`, newDataCards);
  }
  updateSearch(currentSearch) {
    this.search = currentSearch;
  }
  updateProduct() {
    this.options.eventManager.publish('requestProducts');
  }
}