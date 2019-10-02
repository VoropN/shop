import { EventManager } from '../src/event-manager';

export class FilterOption {
  constructor() {
    this.param = {};
    new EventManager().subscribe('updateOptionFilter', (opt, value) => this.param[opt] = value);
  }
}