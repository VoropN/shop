import { Translator } from '../../../src/translator';
import { ProductView } from '../product.view'
import categoryTemplate from './category.html';
import './category.sass';

export class CategoryView extends ProductView {
  constructor() {
    super();
    this.category = document.createElement('div');
    this.category.className = 'category container';
  }
  bindButtonCategory(handler) {
    this.category.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.button')) {
        handler(target.textContent)
      };
    })
  }
  renderCategory(category) {
    let all = new Translator({template: categoryTemplate, component: { category: 'all' } }).format();
    this.category.innerHTML = all + category.map((e) => new Translator({template: categoryTemplate, component: { category: e } }).format()).join('');
    globalContainer.insertBefore(this.category, globalContainer.firstChild);
  }
}