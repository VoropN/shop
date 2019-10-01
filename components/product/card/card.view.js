import { Translator } from '../../../src/translator';
import cardTemplate from './card.html';
import './card.sass';

export class CardView {
  constructor(output, purchases) {
    this.cardList = output;
    this.purchases = purchases;
    this.bindButtonAdd();
  }
  bindButtonAdd() {
    this.cardList.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.button')) {
        if (target.closest('.return')) {
          target.classList.remove('return');
          target.textContent = 'buy';
          target.parentNode.parentNode.classList.remove('block-img-active');
          this.purchases = this.purchases.filter(id => id != target.dataset.id);
        } else {
          target.classList.add('return');
          target.textContent = 'return';
          target.parentNode.parentNode.classList.add('block-img-active');
          this.purchases.push(target.dataset.id);
        };
      };
    });
  }
  render(data) {
    let newData = data.map(e => {
      if (this.purchases.indexOf(String(e.id)) !== -1) {
        return { ...e, buttonActiveClass: 'return', buttonTextContent: 'return', blockImgActive: 'block-img-active' };
      } else {
        return { ...e, buttonTextContent: 'buy' };
      };
    });
    this.cardList.innerHTML = newData.map((e) => new Translator({ template: cardTemplate, data: e }).dataBinding()).join('');
  }
}