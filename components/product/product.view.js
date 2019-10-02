import { Translator } from '../../src/translator';
import productTemplate from './product.html';
import './product.sass';

export class ProductView {
  constructor() {
    this.createOutput();
  }
  createOutput() {
    let fragment = new Translator({ template: productTemplate }).createElement();
    this.productListOutput = fragment.querySelector('.product-list');
    globalContainer.appendChild(fragment);
  }
  render(cardsForRender) {
    let fragment = document.createDocumentFragment();
    cardsForRender.forEach(cardForRender => fragment.append(cardForRender));
    this.productListOutput.innerHTML = '';
    this.productListOutput.appendChild(fragment);
  }
}