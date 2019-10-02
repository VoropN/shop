export class FilterModel {
  getProductForPrice(data, filterOption) {
    return data.filter(product => product.price >= filterOption.price);
  }
}