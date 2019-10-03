import { Translator } from '../../src/translator';
import cardTemplate from './card.html';
import './card.sass';

export class CardView {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.eventManager.subscribe('selectedCards', (selectedCards) => {
      this.selectedCards = selectedCards;
    });
  }
  createCard(dataCard, selectedCards) {
    let newDataCard = selectedCards.indexOf(String(dataCard.id)) !== -1 ?
    { ...dataCard, buttonActiveClass: 'return', buttonTextContent: 'return', blockImgActive: 'block-img-active' } :
    { ...dataCard, buttonTextContent: 'buy' };
    let fragment = new Translator({ template: cardTemplate, data: newDataCard }).createElement();
    this.card = fragment.querySelector('.cart');
    return this.card
  }
}