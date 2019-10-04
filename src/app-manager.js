import { ProductController } from './components/product/product.controller';
import { CartController } from './components/cart/cart.controller';
import { EventManager } from './event-manager';
import { CategoryController } from './components/category/category.controller';
import { SearchController } from './components/search/search.controller';
import { NumberFilterController } from './components/number-filter/number-filter.controller';

export class AppManager {
  constructor() {
    this.eventManager = new EventManager();
    this.productController = new ProductController(this.eventManager);
    this.searchController = new SearchController(this.eventManager);
    this.categoryController = new CategoryController(this.eventManager);
    this.cartController = new CartController(this.eventManager);
    this.priceFilterController = new NumberFilterController(this.eventManager, { current: 'Price', next: 'Quantity', sing: '$' });
    this.quantityFilterController = new NumberFilterController(this.eventManager, { current: 'Quantity', next: 'LifetimeYears' });
    this.lifetimeYearsFilterController = new NumberFilterController(this.eventManager, { current: 'LifetimeYears', next: 'AgeMonth', sing: 'year' });
    this.ageMonthFilterController = new NumberFilterController(this.eventManager, { current: 'AgeMonth', next: 'WeightKg', sing: 'month' });
    this.weightKgFilterController = new NumberFilterController(this.eventManager, { current: 'WeightKg', next: 'Products', sing: 'kg' });
  }
}