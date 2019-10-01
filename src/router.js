import { ProductController } from '../components/product/component/product.controller';
import { CartController } from '../components/cart/cart.controller';

export class Router {
  constructor() {
    this.productController = new ProductController();
    this.cartController = new CartController();
  }
}