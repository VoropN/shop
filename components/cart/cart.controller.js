import { CartModel } from './cart.model';
import { CartView } from './cart.view';

export class CartController {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.cartModel = new CartModel();
    this.cartView = new CartView(eventManager);
    this.eventManager.subscribe('productsForBasket', (dataCards) => console.log(dataCards));
  }
}