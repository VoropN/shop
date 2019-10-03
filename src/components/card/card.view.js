import { Translator } from '../../translator';
import cardTemplate from './card.html';
import './card.sass';

export class CardView {
  createCard(dataCard, selectedCardsId) {
    let newDataCard = selectedCardsId.indexOf(String(dataCard.id)) !== -1 ?
      { ...dataCard, buttonActiveClass: 'return', buttonTextContent: 'return', blockImgActive: 'block-img-active' } :
      { ...dataCard, buttonTextContent: 'buy' };
    let fragment = new Translator({ template: cardTemplate, data: newDataCard }).createElement();
    this.card = fragment.querySelector('.cart');
    return this.card
  }
}