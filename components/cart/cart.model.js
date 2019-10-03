export class CartModel {
  getPurchases() {
    let data = sessionStorage.getItem('selectedCards');
    return data ? data.split(',') : [];
  }
  setPurchases(selectedCardsId) {
    sessionStorage.setItem('selectedCards', selectedCardsId.toString())
  }
}
