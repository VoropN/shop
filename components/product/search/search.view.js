import { Translator } from '../../../../src/translator';
import { CategoryView } from '../category.view';
import searchTemplate from './search.html';
import './search.sass';

export class SearchView extends CategoryView {
  constructor() {
    super();
  }
  inputSeach(handler) {
    let activeCategory = () => (this.categoryActiveRef.nextElementSibling && this.categoryActiveRef.nextElementSibling.textContent) || 'all';
    this.searchActiveRef.addEventListener('input', (e) => {
      let value = e.target.value;
      handler(activeCategory(), value);
    })
  }
  get searchActiveRef() {
    let createRef = function () {
      let form = document.createElement('form');
      new Translator({template: searchTemplate, output: form}).render();
      form.className = 'search-active';
      globalContainer.insertAdjacentElement('afterBegin', form)
      SearchView.searchStatic = form;
    };
    if (!SearchView.searchStatic) {
      createRef();
    };
    return SearchView.searchStatic;
  }
}