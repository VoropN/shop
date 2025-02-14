import { Translator } from '../../translator';
import searchTemplate from './search.html';
import './search.sass';

export class SearchView {
  inputSeach(updateSearch, updateProduct) {
    this.searchOutput.addEventListener('input', (e) => {
      updateSearch(e.target.value);
      updateProduct();
    });
  }
  createOutput() {
    this.searchOutput = document.createElement('div');
    this.searchOutput.className = 'search container';
    globalContainer.insertBefore(this.searchOutput, globalContainer.firstChild);
  }
  renderSearch() {
    this.searchOutput.append(new Translator({template: searchTemplate}).createElement());
  }
}