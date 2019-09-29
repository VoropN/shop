export class CategoryModel {
  constructor(data) {
    this.data = data
  }
  getProductForCategory(category) {
    return this.data.then(data => category === 'all' ? data : data.filter(product => product.type === category));
  }
  getAllCategory() {
    return this.data.then(data => [...new Set(data.map(product => product.type))]);
  }
}