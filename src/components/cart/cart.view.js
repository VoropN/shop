import { Translator } from '../../translator';
import cartTemplate from './cart.html';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './cart.sass';

export class CartView {
  constructor() {
    this.renderCart();
  }
  bucket(getSelectedCardsId) {
    this.cartElem.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.backet')) {
        getSelectedCardsId();
        this.modal.classList.add('modal-open');
      } else if (target.closest('.close-modal')) {
        this.modal.classList.toggle('modal-open');
      } else if(target.closest('.button-details')) {
        target.nextElementSibling.classList.toggle('show');
      };
    });
  }
  bindButtonBuy(removeSelectedCard, addSelectedCard) {
    this.content.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.button-buy')) {
        if (target.closest('.return')) {
          removeSelectedCard(target.dataset.id);
        } else {
          addSelectedCard(target.dataset.id);
        };
      };
    });
  }
  renderCart() {
    let fragment = new Translator({ template: cartTemplate }).createElement();
    this.cartElem = fragment.querySelector('#cart');
    this.content = fragment.querySelector('.modal-content-inner');
    this.modal = fragment.querySelector('.modal');
    this.textIfNotPet = fragment.querySelector('.have-not-pet');
    globalContainer.append(fragment);
  }
  renderContentCart(cards) {
    let fragment = document.createDocumentFragment();
    cards.forEach(cardForRender => fragment.append(cardForRender));
    if (!cards.length) {
      this.textIfNotPet.textContent = 'You haven\'t selected pet yet!';
    } else {
      this.textIfNotPet.textContent = '';
    };
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