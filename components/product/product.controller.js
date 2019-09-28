import { ProductModel } from "./product.model";
import { ProductView } from "./product.view";

export class ProductController {
  constructor() {
    this.productModel = new ProductModel();
    this.productView = new ProductView();
    this.getData();
  }
  getData() {
    return this.productModel.getData().then(data => this.productView.render(data));
  }
}