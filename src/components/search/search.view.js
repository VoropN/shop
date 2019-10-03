import { Translator } from '../../translator';
import searchTemplate from './search.html';
import './search.sass';

export class SearchView {
  constructor() {
    this.createOutput();
    this.renderSearch();
  }
  inputSeach(updateSearch, eventManager) {
    this.searchOutput.addEventListener('input', (e) => {
      updateSearch(e.target.value);
      eventManager.publish('requestProducts');
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