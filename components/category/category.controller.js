import { CategoryModel } from "./category.model";
import { CategoryView } from "./category.view";

export class CategoryController {
  constructor(data) {
    this.categoryModel = new CategoryModel(data);
    this.categoryView = new CategoryView(this);
    this.getAllCategory();
    this.categoryView.bindButtonCategory(this.getProductForCategory.bind(this));
  }
  getProductForCategory(category) {
    return this.categoryModel.getProductForCategory(category).then(data => this.categoryView.render(data));
  }
  getAllCategory() {
    this.categoryModel.getAllCategory().then(category => this.categoryView.renderCategory(category));
  }
}