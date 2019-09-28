import { ProductController } from "../components/product/product.controller";

export class Router {
  constructor() {
    this.productController = new ProductController();
  }
}