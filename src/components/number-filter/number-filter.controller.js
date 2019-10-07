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
    this.numberFilterView.createOutput({ name: this.options.subscribe });
    this.options.eventManager.subscribe(`productsFor${this.options.subscribe}`, (dataCards) => {
      this.max || this.initFilter(dataCards);
      this.filterProductsByParam(dataCards);
    });
  }
  filterProductsByParam(dataCards) {
    let newDataCards = this.numberFilterModel.filterProductsByParam(dataCards, this[this.options.subscribe], this.options.subscribe);
    this.options.eventManager.publish(`productsFor${this.options.publish}`, newDataCards);
  }
  initFilter(dataCards) {
    let dataFild = this.numberFilterModel.convertToDataFild(this.options.subscribe);
    this.max = Math.max(...dataCards.map(dataCard => dataCard[dataFild]));
    this.numberFilterView.renderFilter({
      max: this.max,
      updateProduct: this.updateProduct.bind(this),
      updateFilter: this.updateFilter.bind(this),
      name: this.numberFilterModel.convertFromСamelCase(this.options.subscribe),
      sing: this.options.sing
    });
  }
  updateFilter(currentValue) {
    this[this.options.subscribe] = currentValue;
  }
  updateProduct() {
    this.options.eventManager.publish('requestProducts');
  }
}