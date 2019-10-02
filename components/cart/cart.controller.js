import { CartModel } from './cart.model';
import { CartView } from './cart.view';

export class CartController {
  constructor() {
    this.cartModel = new CartModel();
    this.cartView = new CartView();
  }
}