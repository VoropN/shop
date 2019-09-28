export class ProductModel {
  getData() {
    return fetch('./components/product/data/goods.json').then(e => e.json());
  }
}