import { CardView } from './card.view';

export class CardController {
  constructor(dataCard, selectedCardsId, eventManager) {
    this.eventManager = eventManager;
    this.cardView = new CardView();
    this.cardView.createCard(dataCard, selectedCardsId);
    this.init();
  }
  init() {
    this.eventManager.subscribe('selectedCardsId', (selectedCardsId) => {
      this.cardView.selectedCardsId = selectedCardsId;
    });
  }
}