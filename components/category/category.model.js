export class CategoryModel {
  getProductForCategory(data, filterOption) {
    return (
      filterOption.category === 'all' ?
      data :
      data.filter(product => product.type === filterOption.category)
    );
  }
  getAllCategory(data) {
    return [...new Set(data.map(product => product.type))];
  }
}