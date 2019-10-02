import { CategoryModel } from "./category.model";
import { CategoryView } from "./category.view";
import { EventManager } from '../../src/event-manager';

export class CategoryController {
  constructor() {
    this.categoryModel = new CategoryModel();
    this.categoryView = new CategoryView();
    this.eventManager = new EventManager();
    let isNotRenderAllCategory = true;
    this.eventManager.subscribe('productsForCategory', (dataCards) => {
      if(isNotRenderAllCategory) {
        isNotRenderAllCategory = false;
        this.getAllCategory(dataCards);
      };
      this.filterProductsByCategory(dataCards);
    });
    this.categoryView.bindButtonCategory(this.updateCategory.bind(this), this.eventManager);
  }
  updateCategory(currentCategory) {
    this.category = currentCategory;
  }
  filterProductsByCategory(dataCards) {
    let newDataCards = this.categoryModel.filterProductsByCategory(dataCards, this.category);
    this.eventManager.on('products', newDataCards)
  }
  getAllCategory(dataCards) {
    let availableСategories = this.categoryModel.getAllCategory(dataCards);
    this.categoryView.renderCategory(availableСategories);
  }
}