import { CategoryModel } from './category.model';
import { CategoryView } from './category.view';

export class CategoryController {
  constructor(options) {
    this.options = options;
    this.categoryModel = new CategoryModel();
    this.categoryView = new CategoryView();
    this.init();
  }
  init() {
    this.categoryView.createOutput();
    this.categoryView.createElemActiveCategory();
    this.options.eventManager.subscribe(`productsFor${this.options.subscribe}`, (dataCards) => {
      this.allCategories || this.getAllCategory(dataCards);
      this.filterProductsByCategory(dataCards);
    });
    this.categoryView.bindButtonCategory(this.updateCategory.bind(this), this.updateProduct.bind(this));
  }
  updateCategory(currentCategory) {
    this.category = currentCategory;
    this.options.eventManager.publish('changeCategory', currentCategory);
  }
  filterProductsByCategory(dataCards) {
    let newDataCards = this.categoryModel.filterProductsByCategory(dataCards, this.category);
    this.options.eventManager.publish(`productsFor${this.options.publish}`, newDataCards);
  }
  getAllCategory(dataCards) {
    this.allCategories = this.categoryModel.getAllCategory(dataCards);
    this.categoryView.renderCategory(this.allCategories);
  }
  updateProduct() {
    this.options.eventManager.publish('requestProducts');
  }
}