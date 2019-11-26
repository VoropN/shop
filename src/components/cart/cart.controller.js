import { CartView } from './cart.view';
import { CartModel } from './cart.model';
import { CardController } from '../card/card.controller';
import { PurchaseController } from '../purchase/purchase.controller';

export class CartController {
  constructor(options) {
    this.options = options;
    this.cartView = new CartView();
    this.cartModel = new CartModel();
    this.purchaseController = new PurchaseController();
    this.init();
  }
  init() {
    this.cartView.renderCart();
    this.cartView.bucket(this.getSelectedCardsId.bind(this));
    this.cartView.bindButtonBuy(this.removeSelectedCard.bind(this), this.addSelectedCard.bind(this));
    this.cartView.menu(this.getFormPursaches.bind(this), this.giveToRender.bind(this));

    this.options.eventManager.subscribe(`productsFor${this.options.subscribe}`, (dataCards) => {
      this.dataCards = dataCards;
    });
    this.options.eventManager.subscribe('selectedCardsId', (selectedCardsId) => {
      this.selectedCardsId = selectedCardsId;
      this.giveToRender();
    });
    this.options.eventManager.subscribe('removeSelectedCard', (selectedCardId) => {
      this.cartView.removeSelectedCard(selectedCardId);
    });
    this.options.eventManager.subscribe('addSelectedCard', (selectedCardId) => {
      this.cartView.addSelectedCard(selectedCardId);
    });
  }
  giveToRender() {
    let goods = this.dataCards.filter(dataCard => this.selectedCardsId.indexOf(String(dataCard.id)) !== -1);
    let cardsForRender = goods.map(
      (dataCard) => new CardController(dataCard, this.selectedCardsId, this.options.eventManager).cardView.card);
      this.cartView.renderContentCart(cardsForRender);
  }
  getSelectedCardsId() {
    this.selectedCardsId = this.cartModel.getSelectedCardsId();
    this.options.eventManager.publish('selectedCardsId', this.selectedCardsId);
  }
  removeSelectedCard(cardId) {
    this.cartModel.removeSelectedCard(cardId);
    this.options.eventManager.publish('removeSelectedCard', cardId);
  }
  addSelectedCard(cardId) {
    this.cartModel.addSelectedCard(cardId);
    this.options.eventManager.publish('addSelectedCard', cardId);
  }
  getFormPursaches() {
    let form = this.purchaseController.getForm();
    this.cartView.renderContentCart([form]);
  }
}