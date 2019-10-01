import { Translator } from '../../../src/translator';
import filterTemplate from './filter.html';
import { Slider } from './slider';
import './filter.sass';

export class FilterView {
  constructor(output, filterOption) {
    this.filterOutput = output;
    this.filterOption = filterOption;
  }
  sliderPrice() {
    let sliderElem = this.filterOutput.querySelector('#slider');
    let slide = this.filterOutput.querySelector('#slide');
    let slider = new Slider({ elem: sliderElem, max: this.maxPrice });
    sliderElem.addEventListener('slide', (event) => {
      slide.innerHTML = event.detail + ' $';
    });
    sliderElem.addEventListener('change', (event) => {
      this.filterOption.price = event.detail;
      this.filterOption.update();
    });
  }
  renderFilter(max) {
    this.maxPrice = max;
    let fragment = new Translator({ template: filterTemplate }).createElement();
    this.filterOutput.append(fragment);
    this.sliderPrice();
  }
}