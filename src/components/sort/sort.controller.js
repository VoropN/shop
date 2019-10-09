import { SortView } from './sort.view';
import { SortModel } from './sort.model';

export class SortController {
  constructor(options) {
    this.options = options;
    this.sortView = new SortView();
    this.sortModel = new SortModel();
    this.init();
  }
  init() {
    this.nameFuncSort = 'id';
    this.funcSort = (firs, second) => firs.id - second.id;
    this.sortView.createOutput(this.updateSortState.bind(this));
    this.options.eventManager.subscribe(`productsFor${this.options.subscribe}`, (dataCards) => {
      this.dataCards = dataCards;
      let sortFunc = this.sortModel.getFuncSortByName(this.nameFuncSort);
      let sortData = this.dataCards.sort(sortFunc);
      this.options.eventManager.publish(`productsFor${this.options.publish}`, sortData);
    });
  }
  updateSortState(nameFuncSort) {
    this.nameFuncSort = nameFuncSort;
    let sortFunc = this.sortModel.getFuncSortByName(this.nameFuncSort);
    let sortData = this.dataCards.sort(sortFunc);
    this.options.eventManager.publish(`productsFor${this.options.publish}`, sortData);
  }
}