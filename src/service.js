export class Service {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.eventManager.subscribe('requestProducts', () => this.request('productsForCategory'));
    this.eventManager.subscribe('requestSelectedCardsId', () => this.publishId('selectedCardsId'));
    this.eventManager.subscribe('requestRemoveSelectedCard', (cardId) => this.removeSelectedCard(cardId));
    this.eventManager.subscribe('requestAddSelectedCard', (cardId) => this.addSelectedCard(cardId));
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
  getSelectedCardsId() {
    let selectedCards = sessionStorage.getItem('SelectedCards');
    return selectedCards ? selectedCards.split(',') : [];
  }
  request(request) {
    this.eventManager.publish('requestSelectedCardsId');
    this.getData().then(dataCards => this.eventManager.publish(request, dataCards));
  }
  publishId(request) {
    this.eventManager.publish(request, this.getSelectedCardsId());
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