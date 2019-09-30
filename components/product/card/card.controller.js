import { CardView } from "./card.view";

export class CardController {
  constructor(output, funcGetDate) {
    this.cardView = new CardView(output);
    this.init();
  }
  init() {
    this.cardView.bindButtonAdd(this.addBasket);
  }
  getData(cards) {
    this.cardView.render(cards);
  }
  addBasket(e) {
    console.log(e)
  }
}