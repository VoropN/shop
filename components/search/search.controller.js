import { SearchModel } from './search.model';
import { SearchView } from './search.view';

export class SearchController {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.searchModel = new SearchModel();
    this.searchView = new SearchView();
    this.searchView.inputSeach(this.updateSearch.bind(this), this.eventManager);
    this.eventManager.subscribe('productsForSeach', (dataCards) => this.filterProductsBySearch(dataCards))
  }
  filterProductsBySearch(dataCards) {
    let newDataCards = this.searchModel.filterProductsBySearch(dataCards, this.search);
    this.eventManager.on('products', newDataCards);
  }
  updateSearch(currentSearch) {
    this.search = currentSearch;
  }
}