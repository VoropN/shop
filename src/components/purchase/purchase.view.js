import { Translator } from '../../translator';
import purchaseTemplate from './purchase.html';
import './purchase.sass';

export class PurchaseView {
  constructor() {
    this.form = new Translator({ template: purchaseTemplate }).createElement();
  }
  getForm() {
    return this.form.cloneNode(true);
  }
}