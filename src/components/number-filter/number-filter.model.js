export class NumberFilterModel {
  filterProductsByParam(dataCards, filterParam, filterName) {
    let dataFild = this.convertToDataFild(filterName);
    return !filterParam ? dataCards : dataCards.filter(product => product[dataFild] >= filterParam);
  }
  convertСamelCase(filterName) {
    return filterName
  }
  convertToDataFild(filterName) {
    return filterName[0].toLowerCase() + filterName.slice(1);
    // filterName.replace(/(\w)(\w*)/g, (...w) => w[1].toLowerCase() + w[2]);
  }
}