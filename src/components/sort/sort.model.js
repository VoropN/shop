export class SortModel {
  constructor() {
    this.funcSort = {
      id: (firs, second) => firs.id - second.id,
      priceDown: (firs, second) => second.price - firs.price,
      priceUp: (firs, second) => firs.price - second.price,
      nameDown: (firs, second) => second.name > firs.name ? -1 : 1,
      nameUp: (firs, second) => firs.name > second.name ? -1 : 1,
    }
  }
  getFuncSortByName(name) {
    return this.funcSort[name];
  }
}