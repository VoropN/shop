import { Translator } from '../../src/translator';
import productTemplate from './product.html';
import './product.sass';

export class ProductView {
  render() {
    return Promise.resolve(new Translator({ template: productTemplate }).createElement())
      .then(fragment => {
        this.productListOutput = fragment.querySelector('.product-list');
        globalContainer.appendChild(fragment);
        return productListOutput;
      });
  }
}