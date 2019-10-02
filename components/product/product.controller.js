import { ProductModel } from "./product.model";
import { ProductView } from "./product.view";

export class ProductController {
  constructor() {
    this.productModel = new ProductModel();
    this.productView = new ProductView();
    this.init();
  }
  init() {
    this.productView.render().then(productListOutput => {
      this.cardList = new CardController(productListOutput);
    })
  }
}