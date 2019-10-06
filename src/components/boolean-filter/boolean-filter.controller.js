import { BooleanFilterModel } from './boolean-filter.model';
import { BooleanFilterView } from './boolean-filter.view';

export class BooleanFilterController {
  constructor(options) {
    this.options = options;
    this.booleanFilterModel = new BooleanFilterModel();
    this.booleanFilterView = new BooleanFilterView();
    this.init();
  }
  init() {
    this.filterField = {
      lopiness: null,
      pedigree: null,
      shortLegged: null,
      rapacity: null,
      trimming: null,
      freshwater: null,
      singing: null,
      talking: null,
      flying: null
    };
    this.options.eventManager.subscribe(`productsFor${this.options.subscribe}`, (dataCards) => this.filterProductsByParam(dataCards));
    this.options.eventManager.subscribe(`changeCategory`, (category) => this.changeCategory(category));
  }
  filterProductsByParam(dataCards) {
    if (!this.fieldCategories) {
      this.fieldCategories = this.booleanFilterModel.createFilterByCategory(dataCards, this.filterField);
      this.fieldCategoriesForTemplate = this.booleanFilterModel.createDataForTemplate(this.fieldCategories);
      this.booleanFilterView.renderFilter(this.fieldCategoriesForTemplate['all'], this.filterField);
      this.booleanFilterView.bindCheckbox(this.updateFilter.bind(this), this.updateProduct.bind(this));
      this.category = 'all';
    };
    this.currentFilter = this.booleanFilterModel.createCurrentFilter(this.filterField, this.fieldCategories[this.category]);
    this.filterProducts = this.booleanFilterModel.filterProducts(dataCards, this.currentFilter);
    this.options.eventManager.publish(`productsFor${this.options.publish}`, this.filterProducts);
  }
  updateFilter(field, value) {
    this.filterField[field] = value;
  }
  updateProduct() {
    this.options.eventManager.publish('requestProducts');
  }
  changeCategory(category) {
    this.category = category;
    this.booleanFilterView.renderFilter(this.fieldCategoriesForTemplate[category], this.filterField);
  }
}













//   constructor(options) {
//     this.options = options;
//     this.booleanFilterModel = new BooleanFilterModel();
//     this.booleanFilterView = new BooleanFilterView(this.options);
//     this.init();
//   }
//   init() {
//     this.startFilter();
//     this.booleanFilterView.bindCheckbox(this.updateFilter.bind(this), this.updateProduct.bind(this));
//     this.options.eventManager.subscribe(`productsFor${this.options.subscribe}`, (dataCards) => this.filterProductsByParam(dataCards));
//     // this.options.eventManager.subscribe(`changeCategory`, () => this.startFilter());
//   }
//   filterProductsByParam(dataCards) {
//     let listFilter = this.booleanFilterModel.updateListFilter(dataCards, this.paramFilter);

//     let { listFilter, listDataCards } = this.booleanFilterModel.filterProductsByParam(dataCards, this.paramFilter);
//     // this.listFilter = Object.fromEntries(listFilter.map(.map(key => [key, key]));
//     this.options.eventManager.publish(`productsFor${this.options.publish}`, listDataCards);
//   }
//   updateFilter(field, value) {
//     this.paramFilter[field] = value;
//   }
//   updateProduct() {
//     this.options.eventManager.publish('requestProducts');
//   }
//   startFilter() {
//     this.paramFilter = {
//       lopiness: null,
//       pedigree: null,
//       shortLegged: null,
//       rapacity: null,
//       trimming: null,
//       freshwater: null,
//       singing: null,
//       talking: null,
//       flying: null
//     };
//     this.listFilter = this.paramFilter;
//     let paramFilter = Object.fromEntries(Object.keys(this.paramFilter).map(key => [key, key]));
//     this.booleanFilterView.renderFilter(paramFilter);
//   }
// }