import { CardModel } from "./card.model";
import { CardView } from "./card.view";

export class CardController {
  constructor(output) {
    this.cardModel = new CardModel();
    this.cardView = new CardView(output);
    this.init();
  }
  init() {
    this.cardView.bindButtonAdd(this.addBasket);
    this.getData();
  }
  getData() {
    return this.cardModel.getData().then(data => this.cardView.render(data));
  }
  addBasket(e) {
    console.log(e)
  }
}