export class BooleanFilterModel {
  filterProducts(dataCards, fieldFilter) {
    return dataCards.filter(product => Object.keys(fieldFilter).every(
      (key) => product[key] === fieldFilter[key] || fieldFilter[key] === null));
  }
  createFilterByCategory(dataCards, filterField) {
    let data = dataCards.reduce(
      (acc, el) => acc[el.type] ? acc : {...acc, [el.type]: Object.keys(el).filter(key => filterField[key] !== undefined)}, {});
    data['all'] = [...new Set(Object.values(data).flat(1))];
    return data;
  }
  createDataForTemplate(fieldCategories) {
    return Object.fromEntries(new Map(Object.entries(fieldCategories).map(
      ([key, value]) => ([key, Object.fromEntries(new Map(value.map(name => [name, name])))]) 
    )));
  }
  createCurrentFilter(filterField, fieldCategories) {
    return fieldCategories.reduce((acc, field) => ({...acc, [field]: filterField[field] }), {});
  }
}