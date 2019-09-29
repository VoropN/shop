import { ProductController } from "../components/product/product.controller";
import { CategoryController } from "../components/product/category/category.controller";


export class Router {
  constructor() {
    this.productController = new ProductController();
    this.categoryController = new CategoryController();
  }
}