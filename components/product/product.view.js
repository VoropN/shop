import { Translator } from '../../src/translator';
import product from './product.html';
import './product.sass';

export class ProductView {
  constructor() {
    this.output = globalProduct;
  }
  bindButtonAdd(addBasket) {
    this.output.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.button')) {
        addBasket(target.parentNode.parentNode)
      }
    })
  }
  render(data) {
    this.output.innerHTML = data.map((e) => new Translator({template: product, component: e}).format()).join('');
  }
}