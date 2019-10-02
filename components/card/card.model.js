export class CardModel {
  getSelectCards() {
    let data = sessionStorage.getItem('selectCards');
    return data ? data.split(',') : [];
  }
  saveSelectCards(selectCardsId) {
    sessionStorage.setItem('selectCards', selectCardsId.toString())
  }
}