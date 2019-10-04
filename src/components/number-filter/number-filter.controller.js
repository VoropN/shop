import { NumberFilterModel } from './number-filter.model';
import { NumberFilterView } from './number-filter.view';

export class NumberFilterController {
  constructor(eventManager, options) {
    this.options = options;
    this.eventManager = eventManager;
    this.numberFilterModel = new NumberFilterModel();
    this.numberFilterView = new NumberFilterView(this.options);
    this.init();
  }
  init() {
    let isNotRenderFilter = true;
    this.eventManager.subscribe(`productsFor${this.options.current}`, (dataCards) => {
      if(isNotRenderFilter) {
        this.determineMax(dataCards);
        isNotRenderFilter = false;
      };
      this.filterProductsByParam(dataCards);
    });
  }
  filterProductsByParam(dataCards) {
    let newDataCards = this.numberFilterModel.filterProductsByParam(dataCards, this[this.options.current], this.options.current);
    this.eventManager.publish(`productsFor${this.options.next}`, newDataCards);
  }
  determineMax(dataCards) {
    let dataFild = this.numberFilterModel.convertToDataFild(this.options.current);
    let max = Math.max(...dataCards.map(dataCard => dataCard[dataFild]));
    this.numberFilterView.renderFilter(max, this.updateProduct.bind(this), this.updateFilter.bind(this));
  }
  updateFilter(currentValue) {
    this[this.options.current] = currentValue;
  }
  updateProduct() {
    this.eventManager.publish('requestProducts');
  }
}