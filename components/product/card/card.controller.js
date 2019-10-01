import { CardView } from "./card.view";

export class CardController {
  constructor(output, purchases) {
    this.cardView = new CardView(output, purchases);
    this.purchases = purchases;
  }
  getData(cards) {
    this.cardView.render(cards);
    return cards;
  }
}