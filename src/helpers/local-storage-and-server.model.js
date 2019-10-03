export class LocalStorageAndServerModel {
  getSelectedCardsId() {
    let selectedCards = sessionStorage.getItem('SelectedCards');
    return selectedCards ? selectedCards.split(',') : [];
  }
  removeSelectedCard(cardId) {
    let arrayCardsId = this.getSelectedCardsId()
    arrayCardsId = this.getSelectedCardsId().filter(id => id != cardId);
    sessionStorage.setItem('SelectedCards', arrayCardsId.toString());
  }
  addSelectedCard(cardId) {
    let arrayCardsId = this.getSelectedCardsId()
    arrayCardsId.push(cardId);
    sessionStorage.setItem('SelectedCards', arrayCardsId.toString());
  }
  getData() {
    if (localStorage.getItem('product')) {
      return Promise.resolve(JSON.parse(localStorage.getItem('product')));
    } else {
      return fetch('./src/components/product/data/goods.json').then(e => e.json()).then(data => {
        localStorage.setItem('product', JSON.stringify(data));
        return data;
      });
    }
  }
}