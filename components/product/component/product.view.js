import { Translator } from '../../../src/translator';
import productTemplate from './product.html';
import './product.sass';

export class ProductView {
  render() {
    return Promise.resolve(new Translator({ template: productTemplate }).createElement())
    .then(fragment => {
      this.productOutput = fragment.querySelector('.product');
      this.productListOutput = fragment.querySelector('.product-list');
      this.categoryOutput = fragment.querySelector('.category');
      this.searchOutput = fragment.querySelector('.search');
      this.filterOutput = fragment.querySelector('.filter');
      globalContainer.appendChild(fragment);
    });
  }
}