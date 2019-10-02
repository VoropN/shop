export class PriceFilterModel {
  filterProductsByPrice(dataCards, price) {
    return !price ? dataCards : dataCards.filter(product => product.price >= price);
  }
}