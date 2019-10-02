import { ProductController } from '../components/product/product.controller';
import { CartController } from '../components/cart/cart.controller';
import { EventManager } from './event-manager';
import { FilterOption } from '../components/filter-option';
import { Service } from './service';
import { CategoryController } from '../components/category/category.controller';

export class AppManager {
  constructor() {
    this.init();
  }
  init() {
    this.eventManager = new EventManager();
    this.service = new Service();
    this.filterOption = new FilterOption();
    this.productController = new ProductController();
    this.cartController = new CartController();
    this.categoryController = new CategoryController();
    this.eventManager.on('requestProducts', () => 1)
    
    // this.eventManager.on('updatedA', () => {
    //   this.controllerA.doSmth();
    // });

    // this.eventManager.on('updatedB', () => {
    //   this.controllerB.doSmth();
    // });

    // this.eventManager.on('other', () => {
    //   this.controllerA.doOther();
    // });
  }
}