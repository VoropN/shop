import { Translator } from '../../translator';
import cartTemplate from './cart.html';
import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';
import './cart.sass';

export class CartView {
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
      }
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
        }
      }
    });
  }
  renderCart() {
    let fragment = new Translator({ template: cartTemplate }).createElement();
    this.cartElem = fragment.querySelector('#cart');
    this.content = fragment.querySelector('.modal-content-inner');
    this.cartGrid = fragment.querySelector('.cart-grid');
    this.modal = fragment.querySelector('.modal');
    this.textIfNotPet = fragment.querySelector('.have-not-pet');
    document.querySelector('#globalContainer').append(fragment);
  }
  renderContentCart(cards) {
    let fragment = document.createDocumentFragment();
    cards.forEach(cardForRender => fragment.append(cardForRender));
    if (!cards.length) {
      this.textIfNotPet.textContent = 'You haven\'t selected pet yet!';
    } else {
      this.textIfNotPet.textContent = '';
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
    }
  }
  addSelectedCard(selectedCardId) {
    let target = this.content.querySelector(`[data-id="${selectedCardId}"]`);
    if (target) {
      target.classList.add('return');
      target.textContent = 'return';
      target.parentNode.parentNode.classList.add('block-img-active');
    }
  }
  menu(payment, order) {
    let active = document.createElement('span');
    active.className = 'cart-grid__col_active';
    this.cartGrid.insertBefore(active, this.cartGrid.firstChild);
    this.cartGrid.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.cart-grid__col')) {
        this.cartGrid.insertBefore(active, target);
        if (target.closest('.payment')) {
          payment();
        } else if (target.closest('.order')) {
          order();
        }
      }
    });
  }
}