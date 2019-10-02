import { EventManager } from './event-manager';

export class Service {
  constructor() {
    this.eventManager = new EventManager();
    this.eventManager.subscribe('requestProducts', () => {
      this.getData().then(dataCards => this.eventManager.on('productsForCategory', dataCards))
    })
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
}