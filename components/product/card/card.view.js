import { Translator } from '../../../src/translator';
import cardTemplate from './card.html';
import './card.sass';

export class CardView {
  constructor(output) {
    this.cardList = output;
  }
  bindButtonAdd(addBasket) {
    this.cardList.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.button')) {
        addBasket(target.parentNode.parentNode)
      }
    })
  }
  render(data) {
    this.cardList.innerHTML = data.map((e) => new Translator({ template: cardTemplate, data: e }).dataBinding()).join('');
  }
}