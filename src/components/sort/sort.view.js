import { Translator } from '../../translator';
import sortTemplate from './sort.html';
import './sort.sass';

export class SortView {
  createOutput(updateSortState) {
    let fragment = new Translator({ template: sortTemplate }).createElement();
    this.sortOutput = fragment.querySelector('.sort');
    let price = fragment.querySelector('.price-sort');
    let name = fragment.querySelector('.name-sort');
    this.placeBefore = document.querySelector('.product-list');
    let changePrice = this.changeSortingPrice(price);
    let changeName = this.changeSortingName(name);
    this.sortOutput.addEventListener('click', (e) => {
      let target = e.target;
      if (target.closest('.price-sort')) {
        changeName(true);
        updateSortState( changePrice() );
      } else if (target.closest('.name-sort')) {
        changePrice(true);
        updateSortState( changeName() );
      }
    });
    globalContainer.insertBefore(fragment, this.placeBefore)
  }
  changeSortingPrice(elem) {
    let isPriceUp = true;
    let isPriceDown = true;
    const iconStart = '<i class="fas fa-dollar-sign fa-2x"></i>';
    return (isStart = false) => {
      if (isStart) {
        isPriceUp = false;
        isPriceDown = false;
      };
      if (isPriceUp) {
        elem.innerHTML = '<i class="fas fa-sort-amount-up-alt fa-2x"></i>' + iconStart;
        isPriceUp = !isPriceUp;
        return 'priceUp';
      } else if (isPriceDown) {
        elem.innerHTML = '<i class="fas fa-sort-amount-down fa-2x"></i>' + iconStart;
        isPriceDown = !isPriceDown;
        return 'priceDown';
      } else {
        elem.innerHTML = '<i class="fas fa-arrows-alt-v fa-2x"></i>' + iconStart;
        isPriceUp = true;
        isPriceDown = true;
        return 'id';
      };
    }
  }
  changeSortingName(elem) {
    let isNameUp = true;
    let isNameDown = true;
    const iconStart = '<i class="fas fa-democrat fa-2x"></i>';
    return (isStart = false) => {
      if (isStart) {
        isNameUp = false;
        isNameDown = false;
      }
      if (isNameUp) {
        elem.innerHTML = '<i class="fas fa-sort-alpha-up-alt fa-2x"></i>' + iconStart;
        isNameUp = !isNameUp;
        return 'nameUp';
      } else if (isNameDown) {
        elem.innerHTML = '<i class="fas fa-sort-alpha-down fa-2x"></i>' + iconStart;
        isNameDown = !isNameDown;
        return 'nameDown';
      } else {
        elem.innerHTML = '<i class="fas fa-arrows-alt-v fa-2x"></i>' + iconStart;
        isNameUp = true;
        isNameDown = true;
        return 'id';
      };
    }
  }
}