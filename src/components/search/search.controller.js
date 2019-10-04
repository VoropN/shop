import { SearchModel } from './search.model';
import { SearchView } from './search.view';

export class SearchController {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.searchModel = new SearchModel();
    this.searchView = new SearchView();
    this.init();
  }
  init() {
    this.searchView.inputSeach(this.updateSearch.bind(this), this.updateProduct.bind(this));
    this.eventManager.subscribe('productsForSeach', (dataCards) => this.filterProductsBySearch(dataCards));
  }
  filterProductsBySearch(dataCards) {
    let newDataCards = this.searchModel.filterProductsBySearch(dataCards, this.search);
    this.eventManager.publish('productsForPrice', newDataCards);
  }
  updateSearch(currentSearch) {
    this.search = currentSearch;
  }
  updateProduct() {
    this.eventManager.publish('requestProducts');
  }
}