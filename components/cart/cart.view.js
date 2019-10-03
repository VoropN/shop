import { Translator } from '../../src/translator';
import cartTemplate from './cart.html';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './cart.sass';

export class CartView {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.renderCart()
  }
  bucket() {
    this.cartElem.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.backet')) {
        this.eventManager.on('requestProductsForBasket');
        this.modal.classList.add('modal-open');
      } else if (target.closest('.close-modal')) {
        this.modal.classList.toggle('modal-open');
      } else if (target.closest('.modal-content')) {
        return;
      }
    });
  }
  renderCart() {
    let fragment = new Translator({ template: cartTemplate }).createElement();
    this.cartElem = fragment.querySelector('#cart');
    this.modal = fragment.querySelector('.modal');
    globalContainer.insertBefore(fragment, globalContainer.firstChild);
    this.bucket();
  }
  renderContentCart() {
  }
}