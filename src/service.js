export class Service {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.eventManager.subscribe('requestProducts', () => this.request('productsForCategory'));
    this.eventManager.subscribe('requestSelectedCardsForRender', () => this.getSelectedCards('selectedCardsForRender'));
    this.eventManager.subscribe('requestSelectedCards', () => this.getSelectedCards('selectedCards'));
    this.eventManager.subscribe('requestRemoveSelectedCard', (cardId) => this.removeSelectedCard(cardId));
    this.eventManager.subscribe('requestAddSelectedCard', (cardId) => this.addSelectedCard(cardId));
  }
  getData() {
    if (localStorage.getItem('product')) {
      return Promise.resolve(JSON.parse(localStorage.getItem('product')));
    } else {
      return fetch('./components/product/data/goods.json').then(e => e.json()).then(data => {
        localStorage.setItem('product', JSON.stringify(data));
        return data;
      });
    }
  }
  request(request) {
    this.getData().then(dataCards => this.eventManager.publish(request, dataCards));
  }
  getSelectedCards(request) {
    let dataJson = sessionStorage.getItem('SelectedCards');
    let selectedCardsId = dataJson ? dataJson.split(',') : [];
    this.eventManager.publish(request, selectedCardsId);
  }
  getSelectedCardsId() {
    let selectedCards = sessionStorage.getItem('SelectedCards');
    return selectedCards ? selectedCards.split(',') : [];
  }
  removeSelectedCard(cardId) {
    let arrayCardsId = this.getSelectedCardsId()
    arrayCardsId = this.getSelectedCardsId().filter(id => id != cardId);
    sessionStorage.setItem('SelectedCards', arrayCardsId.toString());
    this.eventManager.publish('removeSelectedCard', cardId);
  }
  addSelectedCard(cardId) {
    let arrayCardsId = this.getSelectedCardsId()
    arrayCardsId.push(cardId);
    sessionStorage.setItem('SelectedCards', arrayCardsId.toString());
    this.eventManager.publish('addSelectedCard', cardId);
  }
}