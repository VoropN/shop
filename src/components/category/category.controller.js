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
    let isNotRenderAllCategory = true;
    this.options.eventManager.subscribe(`productsFor${this.options.subscribe}`, (dataCards) => {
      if (isNotRenderAllCategory) {
        isNotRenderAllCategory = false;
        this.getAllCategory(dataCards);
      };
      this.filterProductsByCategory(dataCards);
    });
    this.categoryView.bindButtonCategory(this.updateCategory.bind(this), this.updateProduct.bind(this));
  }
  updateCategory(currentCategory) {
    this.category = currentCategory;
  }
  filterProductsByCategory(dataCards) {
    let newDataCards = this.categoryModel.filterProductsByCategory(dataCards, this.category);
    this.options.eventManager.publish(`productsFor${this.options.publish}`, newDataCards);
  }
  getAllCategory(dataCards) {
    let availableСategories = this.categoryModel.getAllCategory(dataCards);
    this.categoryView.renderCategory(availableСategories);
  }
  updateProduct() {
    this.options.eventManager.publish('requestProducts');
  }
}