import { EventManager } from '../src/event-manager';

export class FilterOption {
  constructor() {
    this.param = {};
    this.eventManager = new EventManager();
    this.eventManager.subscribe('updateOptionFilter', (opt, value) => {
      this.param[opt] = value;
      this.eventManager.on('optionFilter', () => this.param);
    });
  }
}