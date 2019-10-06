import { Translator } from '../../translator';
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
  bindButtonBuy(removeSelectedCard, addSelectedCard) {
    this.productListOutput.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.button-buy')) {
        if (target.closest('.return')) {
          removeSelectedCard(target.dataset.id);
        } else {
          addSelectedCard(target.dataset.id);
        };
      } else if (target.closest('.button-details')) {
        target.nextElementSibling.classList.toggle('show');
      };
    });
  }
  removeSelectedCard(selectedCardId) {
    let target = this.productListOutput.querySelector(`[data-id="${selectedCardId}"]`);
    if (target) {
      target.classList.remove('return');
      target.textContent = 'buy';
      target.parentNode.parentNode.classList.remove('block-img-active');
    };
  };
  addSelectedCard(selectedCardId) {
    let target = this.productListOutput.querySelector(`[data-id="${selectedCardId}"]`);
    if (target) {
      target.classList.add('return');
      target.textContent = 'return';
      target.parentNode.parentNode.classList.add('block-img-active');
    };
  };
}