import { ProductModel } from "./product.model";
import { ProductView } from "./product.view";

export class ProductController {
  constructor(data) {
    this.productModel = new ProductModel(data);
    this.productView = new ProductView();
    this.productView.bindButtonAdd(this.addBasket);
    this.getData();
  }
  getData() {
    return this.productModel.getData().then(data => this.productView.render(data));
  }
  addBasket(e) {
    console.log(e)
  }
}