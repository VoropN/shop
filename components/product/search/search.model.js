export class SearchModel {
  getProductForSearch(data, filterOption) {
    return data.filter(product => {
      return (
        ~String(product.color).indexOf(filterOption['search']) ||
        ~String(product.name).indexOf(filterOption['search']) ||
        ~String(product.gender).indexOf(filterOption['search']) ||
        ~String(product.price).indexOf(filterOption['search']) ||
        ~String(product.fur).indexOf(filterOption['search']) 
      )
    })
  }
}