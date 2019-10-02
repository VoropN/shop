import { ProductView } from './product.view';
import { CardController } from '../card/card.controller';

export class ProductController {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.productView = new ProductView();
    this.eventManager.subscribe('products', (dataCards) => this.giveToRender(dataCards));
  }
  giveToRender(dataCards) {
    let cardsForRender = this.getCardsForRender(dataCards);
    this.productView.render(cardsForRender);
  }
  getCardsForRender(dataCards) {
    return dataCards.map(dataCard => new CardController(dataCard).cardView.card);
  }
}