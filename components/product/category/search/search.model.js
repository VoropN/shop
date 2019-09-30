import { CategoryModel } from '../category.model';

export class SearchModel extends CategoryModel {
  constructor() {
    super();
  }
  getProductForSearch(category, input) {
    return super.getProductForCategory(category).then(data => data.filter(product => {
      return (
        ~String(product.color).indexOf(input) ||
        ~String(product.name).indexOf(input) ||
        ~String(product.gender).indexOf(input) ||
        ~String(product.price).indexOf(input) ||
        ~String(product.fur).indexOf(input) 
      )
    }));
  }
}