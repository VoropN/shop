import { Translator } from '../../translator';
import numberFilterTemplate from './number-filter.html';
import { Slider } from './slider';
import './number-filter.sass';

export class NumberFilterView {
  constructor(options) {
    this.options = options;
    this.createOutput();
  }
  createOutput() {
    this.filterOutput = document.createElement('div');
    this.filters = document.querySelector('.filters-container');
    if (!this.filters) {
      this.filters = document.createElement('div');
      this.createMenu();
      this.filters.className = 'filters-container';
      globalContainer.insertBefore(this.filters, globalContainer.firstChild);
    };
    this.filterOutput.className = this.options.subscribe.toLowerCase() + ' filter';
    this.filters.append(this.filterOutput);
  }
  createMenu() {
    const menu = {
      tag: document.createElement('div'),
      toggleMenu: () => {
        menu.toggle = !menu.toggle;
        this.filters.classList.toggle('filter-translate');
        globalContainer.classList.toggle('transition');
        if (menu.toggle) {
          menu.tag.innerHTML = '<i class="icon-filter fas fa-reply-all fa-2x"></i>';
        } else {
          menu.tag.innerHTML = '<i class="icon-filter fas fa-ellipsis-h fa-2x"></i>';
        };
      },
    };
    menu.toggleMenu();
    menu.tag.addEventListener('click', menu.toggleMenu);
    document.body.insertBefore(menu.tag, document.body.firstChild);
  }
  sliderFilter(max, updateProduct, updateFilter) {
    const sliderElem = this.filterOutput.querySelector('.slider');
    const slide = this.filterOutput.querySelector('.slide');
    const type = this.filterOutput.querySelector('.type');
    const sing = this.filterOutput.querySelector('.sing');
    let words = this.options.subscribe.replace(/([A-Z])/g,  (w) => ' ' + w.toLowerCase()).trim().split(' ');
    type.textContent = `${words[0][0].toUpperCase() + words[0].slice(1)}:`
    sing.textContent = `${this.options.sing ? this.options.sing : ''}`;
    const slider = new Slider({ elem: sliderElem, max });
    let detail;
    sliderElem.addEventListener('slide', (event) => {
      detail = event.detail;
      slide.innerHTML = detail;
    });
    sliderElem.addEventListener('change', (event) => {
      updateFilter(detail);
      updateProduct();
    });
  }
  renderFilter(max, eventManager, updateFilter) {
    let fragment = new Translator({ template: numberFilterTemplate }).createElement();
    this.filterOutput.append(fragment);
    this.sliderFilter(max, eventManager, updateFilter);
  }
}