import { SortView } from './sort.view';

export class SortController {
  constructor(options) {
    this.options = options;
    this.sortView = new SortView();
    this.init();
  }
  init() {
    this.funcSort = (firs, second) => firs.id - second.id;
    this.sortView.createOutput(this.updateSortState.bind(this));
    this.options.eventManager.subscribe(`productsFor${this.options.subscribe}`, (dataCards) => {
      this.dataCards = dataCards;
      this.options.eventManager.publish(`productsFor${this.options.publish}`, this.dataCards.sort(this.funcSort));
    });
  }
  updateSortState(funcSort) {
    this.funcSort = funcSort;
    let sortData = this.dataCards.sort(this.funcSort);
    this.options.eventManager.publish(`productsFor${this.options.publish}`, sortData);
  }
}