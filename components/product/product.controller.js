import { ProductView } from './product.view';
import { CardController } from '../card/card.controller';

export class ProductController {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.productView = new ProductView(this.eventManager);
    
    this.eventManager.subscribe('products', (dataCards) => {
      this.dataCards = dataCards;
      this.eventManager.on('requestSelectedCardsForRender');
    });
    this.eventManager.subscribe('selectedCardsForRender', (selectedCards) => {
      this.selectedCards = selectedCards;
      this.giveToRender()  
    });

  }
  giveToRender() {
    let cardsForRender = this.dataCards.map(
      (dataCard) => new CardController(dataCard, this.selectedCards, this.eventManager).cardView.card);
    this.productView.render(cardsForRender);
  }
}