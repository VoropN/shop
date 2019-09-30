import { ProductModel } from "./product.model";
import { ProductView } from "./product.view";
import { CardController } from '../card/card.controller';
import { CategoryController } from "../category/category.controller";
import { SearchController } from "../search/search.controller";
import { FilterController } from "../filter/filter.controller";

export class ProductController {
  constructor() {
    this.productModel = new ProductModel();
    this.productView = new ProductView();
    let self = this;
    this.filterOption = {
      category: 'all',
      search: '',
      price: 0,
      update () {
        self.filter();
      }
    };
    this.init();
  }
  init() {
    this.productView.render().then(() => {
      this.cardList = new CardController(this.productView.productListOutput);
      this.category = new CategoryController(this.productView.categoryOutput, this.filterOption);
      this.search = new SearchController(this.productView.searchOutput, this.filterOption);
      this.filterContr = new FilterController(this.productView.filterOutput, this.filterOption);
      this.productModel.getData().then(data => {
        this.cardList.getData(data);
        this.category.getData(data);
        this.filterContr.getData(data);
      });
    });
  }
  filter() {
    this.productModel.getData()
      .then(data => this.category.getProductForCategory(data, this.filterOption))
      .then(data => this.search.getProductForSearch(data, this.filterOption))
      .then(data => this.filterContr.getProductForPrice(data, this.filterOption))
      .then(data => this.cardList.getData(data))
  }
  getData() {
    return this.productModel.getData().then(data => this.productView.render(data));
  }
}