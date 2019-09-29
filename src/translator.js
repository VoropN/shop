export class Translator {
  constructor({ template, component = {}, output }) {
    this.template = template;
    this.component = component;
    this.output = output;
  }
  format() {
    return Object.keys(this.component)
      .reduce((acc, el) => acc.replace(
          new RegExp(`{{\\s*${el}\\s*}}`, 'g'), 
          Array.isArray(this.component[el]) ? this.component[el].join(', ') : this.component[el]
        ), this.template)
      .replace(/\*if=(\w*)/g, (...data) => this.component[data[1]] ? '' : 'hidden');
  }
  render(output) {
    (output || this.output).innerHTML = this.format();
  }
}