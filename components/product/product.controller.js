import { ProductView } from './product.view';
import { CardController } from '../card/card.controller';
import { EventManager } from '../../src/event-manager';

export class ProductController {
  constructor() {
    this.productView = new ProductView();
    new EventManager().subscribe('products', (dataCards) => this.giveToRender(dataCards));
  }
  giveToRender(dataCards) {
    let cardsForRender = this.getCardsForRender(dataCards);
    this.productView.render(cardsForRender);
  }
  getCardsForRender(dataCards) {
    return dataCards.map(dataCard => new CardController(dataCard).cardView.card);
  }
}