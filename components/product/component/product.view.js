import { Translator } from '../../../src/translator';
import productTemplate from './product.html';
import './product.sass';

export class ProductView {
  constructor() {
    this.render()
  }
  render() {
    this.productOutput = new Translator({template: productTemplate}).createElement();
    this.productListOutput = this.productOutput.querySelector('.product-list');
    this.categoryOutput = this.productOutput.querySelector('.category');
    this.searchOutput = this.productOutput.querySelector('.search');
    this.filterOutput = this.productOutput.querySelector('.filter');
    globalContainer.appendChild(this.productOutput);
  }
}