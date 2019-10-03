export class CartModel {
  getSelectedCardsId() {
    let selectedCards = sessionStorage.getItem('SelectedCards');
    return selectedCards ? selectedCards.split(',') : [];
  }
  removeSelectedCard(cardId) {
    let arrayCardsId = this.getSelectedCardsId();
    arrayCardsId = this.getSelectedCardsId().filter(id => id != cardId);
    sessionStorage.setItem('SelectedCards', arrayCardsId.toString());
  }
  addSelectedCard(cardId) {
    let arrayCardsId = this.getSelectedCardsId();
    arrayCardsId.push(cardId);
    sessionStorage.setItem('SelectedCards', arrayCardsId.toString());
  }
}