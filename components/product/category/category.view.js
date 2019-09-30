import { Translator } from '../../../src/translator';
import { ProductView } from '../product.view';
import categoryTemplate from './category.html';
import './category.sass';

export class CategoryView extends ProductView {
  constructor() {
    super();
    this.init();
  }
  init() {
    this.category = document.createElement('div');
    this.category.className = 'category container';
  }
  bindButtonCategory(handler) {
    this.category.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.button')) {
        handler(target.textContent);
        searchElem.value = '';
        target.parentNode.insertBefore(this.categoryActiveRef, target)
      };
    })
  }
  renderCategory(category) {
    let all = new Translator({template: categoryTemplate, component: { category: 'all' } }).format();
    this.category.innerHTML = all + category.map((e) => new Translator({template: categoryTemplate, component: { category: e } }).format()).join('');
    globalContainer.insertBefore(this.category, globalContainer.firstChild);
  }
  get categoryActiveRef() {
    let createRef = function () {
      CategoryView.categoryActiveStatic = document.createElement('div');
      CategoryView.categoryActiveStatic.className = 'category-active';
      globalContainer.appendChild(CategoryView.categoryActiveStatic)
    };
    if (!CategoryView.categoryActiveStatic) {
      createRef();
    };
    return CategoryView.categoryActiveStatic;
  }
}