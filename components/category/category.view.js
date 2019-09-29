import { Translator } from '../../src/translator';
import categoryTemplate from './category.html';
import productTemplate from '../product/product.html';
import './category.sass';

export class CategoryView {
  constructor() {
    this.elem = document.createElement('div');
    this.elem.className = 'category container';
    this.output = globalProduct;
  }
  bindButtonCategory(handler) {
    this.elem.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.button')) {
        handler(target.textContent)
      };
    })
  }
  render(data) {
    this.output.innerHTML = data.map((e) => new Translator({template: productTemplate, component: e}).format()).join('');
  }
  renderCategory(category) {
    let all = new Translator({template: categoryTemplate, component: { category: 'all' } }).format();
    this.elem.innerHTML = all + category.map((e) => new Translator({template: categoryTemplate, component: { category: e } }).format()).join('');
    globalContainer.insertBefore(this.elem, globalContainer.firstChild);
  }
}