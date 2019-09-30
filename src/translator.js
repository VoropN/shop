export class Translator {
  constructor({ template, data = {}}) {
    this.template = template;
    this.data = data;
  }
  dataBinding() {
    return Object.keys(this.data)
      .reduce((acc, el) => acc.replace(
          new RegExp(`{{\\s*${el}\\s*}}`, 'g'), 
          Array.isArray(this.data[el]) ? this.data[el].join(', ') : this.data[el]
        ), this.template)
      .replace(/\*if=(\w*)/g, (...prop) => this.data[prop[1]] ? '' : 'hidden');
  }
  createElement() {
    let element = document.createElement('div');
    let fragment = document.createDocumentFragment();
    element.innerHTML = this.dataBinding();
    [...element.children].forEach(e => fragment.append(e))
    return fragment;
  }
}