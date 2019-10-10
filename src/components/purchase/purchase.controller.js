import { PurchaseView } from './purchase.view';
import { PurchaseModel } from './purchase.model';

export class PurchaseController {
  constructor() {
    this.purchaseView = new PurchaseView();
    this.purchaseModel = new PurchaseModel();
  }
  getForm() {
    return this.purchaseView.getForm();
  }
}