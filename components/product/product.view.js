import { Translator } from '../../src/translator';
import product from './product.html';
import './product.sass';

export class ProductView {
  constructor() {
    this.productTemplate = product;
  }
  get productRef() {
    let createRef = function () {
      ProductView.productStatic = document.createElement('div');
      ProductView.productStatic.className = 'container product';
      globalContainer.appendChild(ProductView.productStatic)
    };
    if (!ProductView.productStatic) {
      createRef();
    };
    return ProductView.productStatic;
  }
  bindButtonAdd(addBasket) {
    this.productRef.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.button')) {
        addBasket(target.parentNode.parentNode)
      }
    })
  }
  render(data) {
    this.productRef.innerHTML = data.map((e) => new Translator({ template: this.productTemplate, component: e }).format()).join('');
  }
}