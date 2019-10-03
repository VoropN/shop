import { CartView } from './cart.view';
import { CartModel } from './cart.model';
import { CardController } from '../card/card.controller';

export class CartController {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.cartView = new CartView();
    this.cartModel = new CartModel();
    this.init();
  }
  init(){
    this.cartView.bucket(this.getSelectedCardsId.bind(this));
    this.cartView.bindButtonBuy(this.removeSelectedCard.bind(this), this.addSelectedCard.bind(this));

    this.eventManager.subscribe('productsBeforeFiltration', (dataCards) => {
      this.dataCards = dataCards;
    });
    this.eventManager.subscribe('selectedCardsId', (selectedCardsId) => {
      this.selectedCardsId = selectedCardsId;
      this.giveToRender();
    });
    this.eventManager.subscribe('removeSelectedCard', (selectedCardId) => {
      this.cartView.removeSelectedCard(selectedCardId);
    });
    this.eventManager.subscribe('addSelectedCard', (selectedCardId) => {
      this.cartView.addSelectedCard(selectedCardId);
    });
  }
  giveToRender() {
    let goods = this.dataCards.filter(dataCard => this.selectedCardsId.indexOf(String(dataCard.id)) !== -1);
    let cardsForRender = goods.map(
      (dataCard) => new CardController(dataCard, this.selectedCardsId, this.eventManager).cardView.card);
      this.cartView.renderContentCart(cardsForRender);
  }
  getSelectedCardsId() {
    this.selectedCardsId = this.cartModel.getSelectedCardsId();
    this.eventManager.publish('selectedCardsId', this.selectedCardsId);
  }
  removeSelectedCard(cardId) {
    this.cartModel.removeSelectedCard(cardId);
    this.eventManager.publish('removeSelectedCard', cardId);
  }
  addSelectedCard(cardId) {
    this.cartModel.addSelectedCard(cardId);
    this.eventManager.publish('addSelectedCard', cardId);
  }
}