export class NumberFilterModel {
  filterProductsByParam(dataCards, filterParam, filterName) {
    let dataFild = this.convertToDataFild(filterName);
    return !filterParam ? dataCards : dataCards.filter(product => product[dataFild] >= filterParam);
  }
  convertFromСamelCase(filterName) {
    let filterNameStr = filterName.replace(/([A-Z])/g,  (w) => ' ' + w.toLowerCase()).trim();
    return filterNameStr[0].toUpperCase() + filterNameStr.slice(1);
  }
  convertToDataFild(filterName) {
    return filterName[0].toLowerCase() + filterName.slice(1);
  }
}