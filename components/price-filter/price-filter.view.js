import { Translator } from '../../src/translator';
import priceFilterTemplate from './price-filter.html';
import { Slider } from './slider';
import './price-filter.sass';

export class PriceFilterView {
  constructor() {
    this.createOutput();
  }
  createOutput() {
    this.priceFilterOutput = document.createElement('div');
    this.priceFilterOutput.className = 'price-filter container';
    globalContainer.insertBefore(this.priceFilterOutput, globalContainer.firstChild);
  }
  sliderPrice(max, eventManager, updatePriceFilter) {
    let sliderElem = this.priceFilterOutput.querySelector('#slider');
    let slide = this.priceFilterOutput.querySelector('#slide');
    let slider = new Slider({ elem: sliderElem, max });
    let detail;
    sliderElem.addEventListener('slide', (event) => {
      detail = event.detail;
      slide.innerHTML = detail;
    });
    sliderElem.addEventListener('change', (event) => {
      updatePriceFilter(detail);
      eventManager.on('requestProducts');
    });
  }
  renderFilter(max, eventManager, updatePriceFilter) {
    let fragment = new Translator({ template: priceFilterTemplate }).createElement();
    this.priceFilterOutput.append(fragment);
    this.sliderPrice(max, eventManager, updatePriceFilter);
  }
}