import { Translator } from '../../../src/translator';
import cardTemplate from './card.html';
import './card.sass';

export class CardView {
  constructor(output) {
    this.cardList = output;
  }
  bindButtonAdd(getPurchases, setPurchases) {
    this.cardList.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.button')) {
        let purchases = getPurchases();
        if (target.closest('.return')) {
          target.classList.remove('return');
          target.textContent = 'buy';
          target.parentNode.parentNode.classList.remove('block-img-active');
          purchases = purchases.filter(id => id != target.dataset.id);
          setPurchases(purchases);
        } else {
          target.classList.add('return');
          target.textContent = 'return';
          target.parentNode.parentNode.classList.add('block-img-active');
          purchases.push(target.dataset.id);
          setPurchases(purchases);
        };
      };
    });
  }
  render(data, getPurchases) {
    let purchases = getPurchases();
    let newData = data.map(e => {
      if (purchases.indexOf(String(e.id)) !== -1) {
        return { ...e, buttonActiveClass: 'return', buttonTextContent: 'return', blockImgActive: 'block-img-active' };
      } else {
        return { ...e, buttonTextContent: 'buy' };
      };
    });
    this.cardList.innerHTML = newData.map((e) => new Translator({ template: cardTemplate, data: e }).dataBinding()).join('');
  }
}