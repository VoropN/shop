import { Translator } from '../../../src/translator';
import categoryTemplate from './category.html';
import './category.sass';

export class CategoryView  {
  constructor(output, filterOpition) {
    this.categoryOutput = output;
    this.filterOption = filterOpition;
    this.createActiveCategory();
    this.bindButtonCategory();
  }
  bindButtonCategory() {
    this.categoryOutput.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.button')) {
        this.changeActiveCategory(target);
        this.filterOption.category = target.textContent;
        this.filterOption.update();
      };
    })
  }
  renderCategory(category) {
    let all = new Translator({template: categoryTemplate, data: { category: 'all' } }).dataBinding();
    this.categoryOutput.innerHTML = all + category.map(
      (e) => new Translator({template: categoryTemplate, data: { category: e } }).dataBinding()).join('');
    this.changeActiveCategory(this.categoryOutput.children[0]);
  }
  createActiveCategory() {
    this.activeCategory = document.createElement('div');
    this.activeCategory.className = 'category-active';
  }
  changeActiveCategory(before) {
    this.categoryOutput.insertBefore(this.activeCategory, before);
  }
}