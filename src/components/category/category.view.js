import { Translator } from '../../translator';
import categoryTemplate from './category.html';
import './category.sass';

export class CategoryView  {
  constructor() {
    this.createOutput();
    this.createElemActiveCategory();
  }
  bindButtonCategory(updateCategory, getProduct) {
    this.categoriesOutput.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.button')) {
        this.changeActiveCategory(target);
        updateCategory(target.textContent);
        getProduct();
      };
    });
  }
  createOutput() {
    this.categoriesOutput = document.createElement('div');
    this.categoriesOutput.className = 'categories container';
    globalContainer.insertBefore(this.categoriesOutput, globalContainer.firstChild);
  }
  createElemActiveCategory() {
    this.activeCategory = document.createElement('div');
    this.activeCategory.className = 'category-active';
  }
  changeActiveCategory(before) {
    this.categoriesOutput.insertBefore(this.activeCategory, before);
  }
  renderCategory(category) {
    let all = new Translator({template: categoryTemplate, data: { category: 'all' } }).dataBinding();
    this.categoriesOutput.innerHTML = all + category.map(
      (e) => new Translator({template: categoryTemplate, data: { category: e } }).dataBinding()).join('');
    this.changeActiveCategory(this.categoriesOutput.firstChild);
  }
}