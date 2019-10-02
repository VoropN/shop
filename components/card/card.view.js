import { Translator } from '../../src/translator';
import cardTemplate from './card.html';
import './card.sass';

export class CardView {
  bindButtonBuy(getSelectCards, saveSelectCards) {
    this.card.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.button')) {
        let selectCards = getSelectCards();
        if (target.closest('.return')) {
          target.classList.remove('return');
          target.textContent = 'buy';
          target.parentNode.parentNode.classList.remove('block-img-active');
          selectCards = selectCards.filter(id => id != target.dataset.id);
        } else {
          target.classList.add('return');
          target.textContent = 'return';
          target.parentNode.parentNode.classList.add('block-img-active');
          selectCards.push(target.dataset.id);
        };
        
        saveSelectCards(selectCards);
      };
    });
  }
  createCard(dataCard, getSelectCards) {
    let newDataCard = getSelectCards().indexOf(String(dataCard.id)) !== -1 ?
    { ...dataCard, buttonActiveClass: 'return', buttonTextContent: 'return', blockImgActive: 'block-img-active' } :
    { ...dataCard, buttonTextContent: 'buy' };
    let fragment = new Translator({ template: cardTemplate, data: newDataCard }).createElement();
    this.card = fragment.querySelector('.cart');
    return this.card
  }
}