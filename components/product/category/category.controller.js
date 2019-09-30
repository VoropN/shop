import { CategoryModel } from "./category.model";
import { CategoryView } from "./category.view";

export class CategoryController {
  constructor(output, filterOpition) {
    this.categoryModel = new CategoryModel();
    this.categoryView = new CategoryView(output, filterOpition);
  }
  getData(data) {
    let category = this.categoryModel.getAllCategory(data);
    this.categoryView.renderCategory(category);
  }
  getProductForCategory(data, filterOption) {
    return this.categoryModel.getProductForCategory(data, filterOption);
  }
  getAllCategory() {
    this.categoryModel.getAllCategory().then(category => this.categoryView.renderCategory(category));
  }
}