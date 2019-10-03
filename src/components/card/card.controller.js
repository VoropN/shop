import { CardView } from './card.view';

export class CardController {
  constructor(dataCard, selectedCards, eventManager) {
    this.eventManager = eventManager;
    this.cardView = new CardView(this.eventManager);
    this.cardView.createCard(dataCard, selectedCards);
  }
}