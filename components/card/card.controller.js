import { CardView } from "./card.view";
import { CardModel } from "./card.model";

export class CardController {
  constructor(output) {
    this.cardView = new CardView(output);
    this.cardModel = new CardModel(output);
    this.cardView.bindButtonAdd(this.getPurchases.bind(this), this.setPurchases.bind(this));
  }
  getData(cards) {
    this.cardView.render(cards, this.getPurchases.bind(this));
    return cards;
  }
  getPurchases() {
    return this.cardModel.getPurchases();
  }
  setPurchases(purchasesId) {
    this.cardModel.setPurchases(purchasesId);
  }
}