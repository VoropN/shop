export class SearchModel {
  filterProductsBySearch(dataCards, search) {
    return !search ? dataCards : dataCards.filter(product => {
      return (
        ~String(product.color).indexOf(search) ||
        ~String(product.name).indexOf(search) ||
        ~String(product.gender).indexOf(search) ||
        ~String(product.price).indexOf(search)  ||
        (product.fur ? ~String(product.fur).indexOf(search) : false)
      )
    })
  }
}