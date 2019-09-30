import { ProductModel } from "./product.model";
import { ProductView } from "./product.view";
import { CardController } from '../card/card.controller';

export class ProductController {
  constructor() {
    this.productModel = new ProductModel();
    this.productView = new ProductView();
    this.card = new CardController(this.productView.productListOutput);
  }
  getData() {
    return this.productModel.getData().then(data => this.productView.render(data));
  }
}