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
    this.renderCart();
    this.eventManager.subscribe('selectedCards', (selectedCards) => {
      this.selectedCards = selectedCards;
    });
  }
  bucket() {
    this.cartElem.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.backet')) {
        this.eventManager.publish('requestProductsForBasket');
        this.modal.classList.add('modal-open');
      } else if (target.closest('.close-modal')) {
        this.modal.classList.toggle('modal-open');
      } else if (target.closest('.modal-content')) {
        return;
      }
    });
  }
  bindButtonBuy() {
    this.content.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.button-buy')) {
        this.eventManager.publish('requestSelectedCards');
        if (target.closest('.return')) {
          this.selectedCards = this.selectedCards.filter(id => id != target.dataset.id);
          target.classList.remove('return');
          target.textContent = 'buy';
          target.parentNode.parentNode.classList.remove('block-img-active');
          this.eventManager.publish('deleteItem', target.dataset.id);
        } else {
          this.selectedCards.push(target.dataset.id);
          target.classList.add('return');
          target.textContent = 'return';
          target.parentNode.parentNode.classList.add('block-img-active');
          this.eventManager.publish('addItem', target.dataset.id);
        };

        this.eventManager.publish('saveSelectedCards', this.selectedCards);
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
    this.bucket();
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
}