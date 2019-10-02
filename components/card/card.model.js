export class CardModel {
  getPurchases() {
    let data = sessionStorage.getItem('purchases');
    return data ? data.split(',') : [];
  }
  setPurchases(purchasesId) {
    sessionStorage.setItem('purchases', purchasesId.toString())
  }
}