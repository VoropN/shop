import { PriceFilterModel as PriceFilterModel } from './price-filter.model';
import { PriceFilterView } from './price-filter.view';

export class PriceFilterController {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.filterModel = new PriceFilterModel();
    this.filterView = new PriceFilterView();
    this.init();
  }
  init() {
    let isNotRenderPriceFilter = true;
    this.eventManager.subscribe('productsForPrice', (dataCards) => {
      if(isNotRenderPriceFilter) {
        this.determineMaxPrice(dataCards);
        isNotRenderPriceFilter = false;
      };
      this.filterProductsByPrice(dataCards);
    });
  }
  filterProductsByPrice(dataCards) {
    let newDataCards = this.filterModel.filterProductsByPrice(dataCards, this.price);
    this.eventManager.publish('products', newDataCards);
  }
  determineMaxPrice(dataCards) {
    let max = Math.max(...dataCards.map(dataCard => dataCard.price));
    this.filterView.renderFilter(max, this.getProduct.bind(this), this.updatePriceFilter.bind(this));
  }
  updatePriceFilter(currentPrice) {
    this.price = currentPrice;
  }
  getProduct() {
    this.eventManager.publish('requestProducts');
  }
}