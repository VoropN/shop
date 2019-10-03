import { ProductController } from './components/product/product.controller';
import { CartController } from './components/cart/cart.controller';
import { EventManager } from './event-manager';
import { Service } from './service';
import { CategoryController } from './components/category/category.controller';
import { SearchController } from './components/search/search.controller';
import { PriceFilterController } from './components/price-filter/price-filter.controller';

export class AppManager {
  constructor() {
    this.eventManager = new EventManager();
    // this.service = new Service(this.eventManager);
    this.productController = new ProductController(this.eventManager);
    this.priceFilterController = new PriceFilterController(this.eventManager);
    this.searchController = new SearchController(this.eventManager);
    this.categoryController = new CategoryController(this.eventManager);
    this.cartController = new CartController(this.eventManager);
  }
}