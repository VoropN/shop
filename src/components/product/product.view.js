import { Translator } from '../../translator';
import productTemplate from './product.html';
import './product.sass';

export class ProductView {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.createOutput();
    this.eventManager.subscribe('removeSelectedCard', (selectedCardId) => {
      this.removeSelectedCard(selectedCardId);
    });
    this.eventManager.subscribe('addSelectedCard', (selectedCardId) => {
      this.addSelectedCard(selectedCardId);
    });
  }
  createOutput() {
    let fragment = new Translator({ template: productTemplate }).createElement();
    this.productListOutput = fragment.querySelector('.product-list');
    globalContainer.appendChild(fragment);
    this.bindButtonBuy();
  }
  render(cardsForRender) {
    let fragment = document.createDocumentFragment();
    cardsForRender.forEach(cardForRender => fragment.append(cardForRender));
    this.productListOutput.innerHTML = '';
    this.productListOutput.appendChild(fragment);
  }
  bindButtonBuy() {
    this.productListOutput.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.button-buy')) {
        if (target.closest('.return')) {
          this.eventManager.publish('requestRemoveSelectedCard', target.dataset.id);
        } else {
          this.eventManager.publish('requestAddSelectedCard', target.dataset.id);
        };
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