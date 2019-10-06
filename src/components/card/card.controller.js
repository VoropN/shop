import { CardView } from './card.view';

export class CardController {
  constructor(dataCard, selectedCardsId, eventManager) {
    this.eventManager = eventManager;
    this.cardView = new CardView();
    this.cardView.createCard(dataCard, selectedCardsId);
    this.init();
  }
  init() {
    this.unsubscrSelectedCardsId = this.eventManager.subscribe('selectedCardsId', (selectedCardsId) => {
      this.cardView.selectedCardsId = selectedCardsId;
    });
    this.unsubscrRequestProducts = this.eventManager.subscribe('requestProducts', () => {
      this.unsubscrSelectedCardsId();
      this.unsubscrRequestProducts()
    });
  }
}