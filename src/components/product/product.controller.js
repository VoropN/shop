import { ProductView } from './product.view';
import { CardController } from '../card/card.controller';

export class ProductController {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.productView = new ProductView(this.eventManager);
    this.eventManager.subscribe('products', (dataCards) => {
      this.dataCards = dataCards;
      this.giveToRender();
    });
    this.eventManager.subscribe('selectedCardsId', (selectedCardsId) => {
      this.selectedCardsId = selectedCardsId;
    });
    this.eventManager.publish('requestProducts');
  }
  giveToRender() {
    let cardsForRender = this.dataCards.map(
      (dataCard) => new CardController(dataCard, this.selectedCardsId, this.eventManager).cardView.card);
    this.productView.render(cardsForRender);
  }
}