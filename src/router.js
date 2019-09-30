import { ProductController } from "../components/product/component/product.controller";
// import { CategoryController } from "../components/product/category/category.controller";
// import { SearchController } from "../components/product/category/search/search.controller";


export class Router {
  constructor() {
    this.productController = new ProductController();
    // this.categoryController = new CategoryController();
    // this.searchController = new SearchController();
  }
}