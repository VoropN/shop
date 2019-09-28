import { Translator } from '../../src/translator';
import product from './product.html';
import './product.sass';

export class ProductView {
  constructor() {
    this.elem = document.createElement('div');
    this.elem.classList.add('product');
  }
  render(data) {
    this.elem.innerHTML = data.map((e) => new Translator({template: product, component: e}).format()).join('');
    container.append(this.elem);
  }
}