import { NumberFilterModel } from './number-filter.model';
import { NumberFilterView } from './number-filter.view';

export class NumberFilterController {
  constructor(options) {
    this.options = options;
    this.numberFilterModel = new NumberFilterModel();
    this.numberFilterView = new NumberFilterView(this.options);
    this.init();
  }
  init() {
    let isNotRenderFilter = true;
    this.options.eventManager.subscribe(`productsFor${this.options.subscribe}`, (dataCards) => {
      if(isNotRenderFilter) {
        this.determineMax(dataCards);
        isNotRenderFilter = false;
      };
      this.filterProductsByParam(dataCards);
    });
  }
  filterProductsByParam(dataCards) {
    let newDataCards = this.numberFilterModel.filterProductsByParam(dataCards, this[this.options.subscribe], this.options.subscribe);
    this.options.eventManager.publish(`productsFor${this.options.publish}`, newDataCards);
  }
  determineMax(dataCards) {
    let dataFild = this.numberFilterModel.convertToDataFild(this.options.subscribe);
    let max = Math.max(...dataCards.map(dataCard => dataCard[dataFild]));
    this.numberFilterView.renderFilter(max, this.updateProduct.bind(this), this.updateFilter.bind(this));
  }
  updateFilter(currentValue) {
    this[this.options.subscribe] = currentValue;
  }
  updateProduct() {
    this.options.eventManager.publish('requestProducts');
  }
}