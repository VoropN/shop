import { Translator } from '../../translator';
import numberFilterTemplate from './number-filter.html';
import { Slider } from './slider';
import './number-filter.sass';

export class NumberFilterView {
  createOutput({ name }) {
    this.filterOutput = document.createElement('div');
    this.filters = document.querySelector('.filters-container');
    if (!this.filters) {
      this.filters = document.createElement('div');
      this.filters.className = 'filters-container';
      this.createMenu();
      globalContainer.insertBefore(this.filters, globalContainer.firstChild);
    };
    this.filterOutput.className = name.toLowerCase() + ' filter';
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
          menu.tag.innerHTML = '<i class="icon-filter fas fa-ellipsis-h fa-2x"></i>';
        } else {
          menu.tag.innerHTML = '<i class="icon-filter fas fa-reply-all fa-2x"></i>';
        };
      },
    };
    menu.toggleMenu();
    globalContainer.classList.toggle('transition');
    menu.tag.addEventListener('click', menu.toggleMenu);
    document.body.insertBefore(menu.tag, document.body.firstChild);
  }
  sliderFilter({ max, updateProduct, updateFilter, name, sing }) {
    const sliderElem = this.filterOutput.querySelector('.slider');
    const slide = this.filterOutput.querySelector('.slide');
    const type = this.filterOutput.querySelector('.type');
    const singTag = this.filterOutput.querySelector('.sing');
    type.textContent = `${name.split(' ')[0]}:`
    singTag.textContent = `${sing ? sing : ''}`;
    new Slider({ elem: sliderElem, max });
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
  renderFilter(options) {
    let fragment = new Translator({ template: numberFilterTemplate }).createElement();
    this.filterOutput.append(fragment);
    this.sliderFilter(options);
  }
}