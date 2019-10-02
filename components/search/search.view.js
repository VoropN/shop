import { Translator } from '../../../src/translator';
import searchTemplate from './search.html';
import './search.sass';

export class SearchView {
  constructor(output, filterOption) {
    this.searchOutput = output;
    this.filterOption = filterOption;
    this.renderSearch();
    this.inputSeach();
  }
  inputSeach() {
    this.searchOutput.addEventListener('input', (e) => {
      this.filterOption.search = e.target.value;
      this.filterOption.update();
    });
  }
  renderSearch() {
    this.searchOutput.append(new Translator({template: searchTemplate}).createElement());
  }
}