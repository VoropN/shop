export class Service {
  constructor(eventManager) {
    this.eventManager = eventManager;
    this.eventManager.subscribe('requestProducts', () => this.request('productsForCategory'));
    this.eventManager.subscribe('requestProductsForBasket', () => this.request('productsForBasket'));
    this.eventManager.subscribe('requestSelectedCardsForBasket', () => this.getSelectedCards('selectedCardsForBasket'));
    this.eventManager.subscribe('requestSelectedCards', () => this.getSelectedCards('selectedCards'));
    this.eventManager.subscribe('requestSelectedCardsForRender', () => this.getSelectedCards('selectedCardsForRender'));
    this.eventManager.subscribe('saveSelectedCards', (SelectedCardsId) => this.saveSelectedCards(SelectedCardsId));
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
    let dataArr = dataJson ? dataJson.split(',') : [];
    this.eventManager.publish(request, dataArr);
  }
  saveSelectedCards(SelectedCardsId) {
    sessionStorage.setItem('SelectedCards', SelectedCardsId.toString())
  }
}