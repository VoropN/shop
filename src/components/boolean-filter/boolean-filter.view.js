import { Translator } from '../../translator';
import booleanFilterTemplate from './boolean-filter.html';
import './boolean-filter.sass';

export class BooleanFilterView {
  bindCheckbox(updateFilter, updateProduct) {
    this.filterOutput.addEventListener('change', (e) => {
      let target = e.target;
      if(target.closest('.boolean-filter-input')) {
        this.changeState(target);
        updateFilter(target.id, target.readOnly ? null : target.checked);
        updateProduct();
      }
    });
  }
  renderFilter(data, filterField) {
    let fragment = new Translator({ template: booleanFilterTemplate, data }).createElement();
    fragment.querySelectorAll('[type="checkbox"]').forEach((checkbox) => {
      this.setValueCheckBox(checkbox, filterField[checkbox.id]);
    });
    if (!this.filterOutput) {
      this.filterOutput = document.createElement('div');
      this.filterOutput.className = 'filters-block';
      let container = document.querySelector('.filters-container');
      container.append(this.filterOutput);
    }
    this.filterOutput.innerHTML = '';
    this.filterOutput.appendChild(fragment);
  }
  changeState(checkbox) {
    checkbox.classList.remove('checked');
    if (checkbox.readOnly) {
      checkbox.checked = true;
      checkbox.readOnly = false;
      checkbox.classList.add('checked');
    } else if (checkbox.checked) {
      checkbox.readOnly = checkbox.indeterminate = true;
    }
  }
  setValueCheckBox(checkbox, value) {
    if (value === true) {
      checkbox.checked = true;
      checkbox.readOnly = false;
      checkbox.classList.add('checked');
    } else if (value === false) {
      checkbox.checked = false;
    } else {
      checkbox.readOnly = checkbox.indeterminate = true;
    }
  }
}