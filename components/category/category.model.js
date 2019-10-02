export class CategoryModel {
  filterProductsByCategory(dataCards, category) {
    return category === 'all' || !category ? dataCards : dataCards.filter(product => product.type === category);
  }
  getAllCategory(dataCards) {
    return [...new Set(dataCards.map(product => product.type))];
  }
}