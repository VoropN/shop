import { ProductController } from "../components/product/product.controller";
import { ProductService } from "./product.service";
import { CategoryController } from "../components/category/category.controller";


export class Router {
  constructor() {
    this.productService = new ProductService();
    let data = this.productService.getData();
    this.productController = new ProductController(data);
    this.categoryController = new CategoryController(data);
  }
}