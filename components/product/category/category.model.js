import { ProductModel } from '../component/product.model';

export class CategoryModel extends ProductModel {
  constructor() {
    super();
  }
  getProductForCategory(category) {
    return this.getData().then(data => category === 'all' ? data : data.filter(product => product.type === category));
  }
  getAllCategory() {
    return this.getData().then(data => [...new Set(data.map(product => product.type))]);
  }
}