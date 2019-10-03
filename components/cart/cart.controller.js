import { CartView } from './cart.view';
import { CardController } from '../card/card.controller';

export class CartController {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.cartView = new CartView(eventManager);

    this.eventManager.subscribe('productsForBasket', (dataCards) => {
      this.dataCards = dataCards;
      this.eventManager.on('requestSelectedCardsForBasket');
    });
    this.eventManager.subscribe('selectedCardsForBasket', (selectedCards) => {
      this.selectedCards = selectedCards;
      this.giveToRender();
    });
  }
  giveToRender() {
    let goods = this.dataCards.filter(dataCard => this.selectedCards.indexOf(String(dataCard.id)) !== -1);
    let cardsForRender = goods.map(
      (dataCard) => new CardController(dataCard, this.selectedCards, this.eventManager).cardView.card);
      this.cartView.renderContentCart(cardsForRender);
  }
}