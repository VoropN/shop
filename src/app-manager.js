import { ProductController } from '../components/product/product.controller';
import { CartController } from '../components/cart/cart.controller';
import { EventManager } from './event-manager';
import { FilterOption } from '../components/filter-option';

export class AppManager {
  constructor() {
    this.init();
  }
  init() {
    this.eventManager = new EventManager();
    this.filterOption = new FilterOption();
    this.productController = new ProductController();
    this.cartController = new CartController();

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