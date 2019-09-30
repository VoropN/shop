import { FilterModel } from "./filter.model";
import { FilterView } from "./filter.view";

export class FilterController {
  constructor(output, filterOpition) {
    this.filterModel = new FilterModel();
    this.filterView = new FilterView(output, filterOpition);
  }
  getProductForPrice(data, filterOption) {
    return this.filterModel.getProductForPrice(data, filterOption);
  }
  getData(data) {
    let max = Math.max(...data.map(e => e.price));
    this.filterView.renderFilter(max);
  }
}