import { CardView } from './card.view';
import { CardModel } from './card.model';

export class CardController {
  constructor(cartData) {
    this.cardView = new CardView();
    this.cardModel = new CardModel();
    this.cardView.createCard(cartData, this.getSelectCards.bind(this))
    this.cardView.bindButtonBuy(this.getSelectCards.bind(this), this.saveSelectCards.bind(this));
  }
  getSelectCards() {
    return this.cardModel.getSelectCards();
  }
  saveSelectCards(selectCardsId) {
    this.cardModel.saveSelectCards(selectCardsId);
  }
}