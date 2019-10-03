import { Translator } from '../../translator';
import cartTemplate from './cart.html';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './cart.sass';

export class CartView {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.renderCart();
    this.eventManager.subscribe('removeSelectedCard', (selectedCardId) => {
      this.removeSelectedCard(selectedCardId);
    });
    this.eventManager.subscribe('addSelectedCard', (selectedCardId) => {
      this.addSelectedCard(selectedCardId);
    });
  }
  bucket() {
    this.cartElem.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.backet')) {
        this.eventManager.publish('requestSelectedCardsId');
        this.modal.classList.add('modal-open');
      } else if (target.closest('.close-modal')) {
        this.modal.classList.toggle('modal-open');
      };
    });
  }
  bindButtonBuy() {
    this.content.addEventListener('click', (e) => {
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
  renderCart() {
    let fragment = new Translator({ template: cartTemplate }).createElement();
    this.cartElem = fragment.querySelector('#cart');
    this.content = fragment.querySelector('.modal-content-inner');
    this.modal = fragment.querySelector('.modal');
    this.textForIfNotPet = fragment.querySelector('.have-not-pet');
    globalContainer.append(fragment);
    this.bindButtonBuy();
  }
  renderContentCart(cards) {
    let fragment = document.createDocumentFragment();
    cards.forEach(cardForRender => fragment.append(cardForRender));
    if (!cards.length) {
      this.textForIfNotPet.textContent = 'You haven\'t selected pet yet!';
    } else {
      this.textForIfNotPet.textContent = '';
    }
    this.content.innerHTML = '';
    this.content.appendChild(fragment);
  }
  removeSelectedCard(selectedCardId) {
    let target = this.content.querySelector(`[data-id="${selectedCardId}"]`);
    if (target) {
      target.classList.remove('return');
      target.textContent = 'buy';
      target.parentNode.parentNode.classList.remove('block-img-active');
    };
  };
  addSelectedCard(selectedCardId) {
    let target = this.content.querySelector(`[data-id="${selectedCardId}"]`);
    if (target) {
      target.classList.add('return');
      target.textContent = 'return';
      target.parentNode.parentNode.classList.add('block-img-active');
    };
  };
}