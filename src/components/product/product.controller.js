import { ProductView } from './product.view';
import { CardController } from '../card/card.controller';
import { ProductModel } from './product.model';

export class ProductController {
  constructor(options) {
    this.options = options;
    this.productView = new ProductView();
    this.productModel = new ProductModel();
    this.init();
  }
  init() {
    this.productView.createOutput();
    this.productView.bindButtonBuy(this.removeSelectedCard.bind(this), this.addSelectedCard.bind(this));
    this.options.eventManager.subscribe(`productsFor${this.options.subscribe}`, (dataCards) => {
      this.dataCards = dataCards;
      this.giveToRender();
    });
    this.options.eventManager.subscribe('requestProducts', () => {
      this.selectedCardsId = this.productModel.getSelectedCardsId();
      this.options.eventManager.publish('selectedCardsId', this.selectedCardsId);
      this.productModel.getData().then(dataCards => this.options.eventManager.publish(`productsFor${this.options.publish}`, dataCards));
    });
    this.options.eventManager.subscribe('selectedCardsId', (selectedCardsId) => {
      this.selectedCardsId = selectedCardsId;
    });
    this.options.eventManager.subscribe('removeSelectedCard', (selectedCardId) => {
      this.productView.removeSelectedCard(selectedCardId);
    });
    this.options.eventManager.subscribe('addSelectedCard', (selectedCardId) => {
      this.productView.addSelectedCard(selectedCardId);
    });
    this.options.eventManager.publish('requestProducts');
  }
  giveToRender() {
    let cardsForRender = this.dataCards.map(
      (dataCard) => new CardController(dataCard, this.selectedCardsId, this.options.eventManager).cardView.card);
    this.productView.render(cardsForRender);
  }
  removeSelectedCard(cardId) {
    this.productModel.removeSelectedCard(cardId);
    this.options.eventManager.publish('removeSelectedCard', cardId);
  }
  addSelectedCard(cardId) {
    this.productModel.addSelectedCard(cardId);
    this.options.eventManager.publish('addSelectedCard', cardId);
  }
}