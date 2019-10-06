export class EventManager {
  constructor() {
    this.events = {};
  }
  publish(eventName, data) {
    this.events[eventName] && this.events[eventName].forEach(fn => fn(data));
  }
  subscribe(eventName, fn) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    };
    this.events[eventName].push(fn);
    return () => this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
  }
  unsubscribe(eventName, fn) {
    this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
  }
}