import { CategoryModel } from './category.model';
import { CategoryView } from './category.view';

export class CategoryController {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.categoryModel = new CategoryModel();
    this.categoryView = new CategoryView();
    this.init();
  }
  init() {
    let isNotRenderAllCategory = true;
    this.eventManager.subscribe('productsBeforeFiltration', (dataCards) => {
      if (isNotRenderAllCategory) {
        isNotRenderAllCategory = false;
        this.getAllCategory(dataCards);
      };
      this.filterProductsByCategory(dataCards);
    });
    this.categoryView.bindButtonCategory(this.updateCategory.bind(this), this.getProduct.bind(this));
  }
  updateCategory(currentCategory) {
    this.category = currentCategory;
  }
  filterProductsByCategory(dataCards) {
    let newDataCards = this.categoryModel.filterProductsByCategory(dataCards, this.category);
    this.eventManager.publish('productsForSeach', newDataCards);
  }
  getAllCategory(dataCards) {
    let availableСategories = this.categoryModel.getAllCategory(dataCards);
    this.categoryView.renderCategory(availableСategories);
  }
  getProduct() {
    this.eventManager.publish('requestProducts');
  }
}