import { ProductController } from './components/product/product.controller';
import { CartController } from './components/cart/cart.controller';
import { EventManager } from './event-manager';
import { CategoryController } from './components/category/category.controller';
import { SearchController } from './components/search/search.controller';
import { NumberFilterController } from './components/number-filter/number-filter.controller';

export class AppManager {
  constructor() {
    const eventManager = new EventManager()
    this.productController = new ProductController({ eventManager, subscribe: 'Products', publish: 'Category' });
    this.categoryController = new CategoryController({ eventManager, subscribe: 'Category', publish: 'Search' });
    this.cartController = new CartController({ eventManager, subscribe: 'Category' });
    this.searchController = new SearchController({ eventManager, subscribe: 'Search', publish: 'Price' });
    this.priceFilterController = new NumberFilterController({ eventManager, subscribe: 'Price', publish: 'Quantity', sing: '$' });
    this.quantityFilterController = new NumberFilterController({ eventManager, subscribe: 'Quantity', publish: 'LifetimeYears' });
    this.lifetimeYearsFilterController = new NumberFilterController({ eventManager, subscribe: 'LifetimeYears', publish: 'AgeMonth', sing: 'year' });
    this.ageMonthFilterController = new NumberFilterController({ eventManager, subscribe: 'AgeMonth', publish: 'WeightKg', sing: 'month' });
    this.weightKgFilterController = new NumberFilterController({ eventManager, subscribe: 'WeightKg', publish: 'Products', sing: 'kg' });
  }
}