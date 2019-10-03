import { ProductView } from './product.view';
import { CardController } from '../card/card.controller';
import { ProductModel } from './product.model';

export class ProductController {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.productView = new ProductView();
    this.productModel = new ProductModel();
    this.init();
  }
  init() {
    this.productView.bindButtonBuy(this.removeSelectedCard.bind(this), this.addSelectedCard.bind(this));
    this.eventManager.subscribe('products', (dataCards) => {
      this.dataCards = dataCards;
      this.giveToRender();
    });
    this.eventManager.subscribe('requestProducts', () => {
      this.selectedCardsId = this.productModel.getSelectedCardsId();
      this.eventManager.publish('selectedCardsId', this.selectedCardsId);
      this.productModel.getData().then(dataCards => this.eventManager.publish('productsForCategory', dataCards));
    });
    this.eventManager.subscribe('selectedCardsId', (selectedCardsId) => {
      this.selectedCardsId = selectedCardsId;
    });
    this.eventManager.subscribe('removeSelectedCard', (selectedCardId) => {
      this.productView.removeSelectedCard(selectedCardId);
    });
    this.eventManager.subscribe('addSelectedCard', (selectedCardId) => {
      this.productView.addSelectedCard(selectedCardId);
    });
    this.eventManager.publish('requestProducts');
  }
  giveToRender() {
    let cardsForRender = this.dataCards.map(
      (dataCard) => new CardController(dataCard, this.selectedCardsId, this.eventManager).cardView.card);
    this.productView.render(cardsForRender);
  }
  removeSelectedCard(cardId) {
    this.productModel.removeSelectedCard(cardId);
    this.eventManager.publish('removeSelectedCard', cardId);
  }
  addSelectedCard(cardId) {
    this.productModel.addSelectedCard(cardId);
    this.eventManager.publish('addSelectedCard', cardId);
  }
}