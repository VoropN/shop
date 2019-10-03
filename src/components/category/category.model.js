import { LocalStorageAndServerModel } from '../../helpers/local-storage-and-server.model';

export class CategoryModel extends LocalStorageAndServerModel {
  filterProductsByCategory(dataCards, category) {
    return category === 'all' || !category ? dataCards : dataCards.filter(product => product.type === category);
  }
  getAllCategory(dataCards) {
    return [...new Set(dataCards.map(product => product.type).sort())];
  }
}