export class Slider {
  constructor(options) {
    this.elem = options.elem;
    this.thumbElem = this.elem.querySelector('.thumb');
    this.max = options.max || 100;
    this.sliderCoords;
    this.thumbCoords;
    this.shiftX;
    this.shiftY;
    this.pixelsPerValue = (this.elem.clientWidth - this.thumbElem.clientWidth) / this.max;
    this.init();
  }
  init() {
    this.elem.ondragstart = () => false;
    this.elem.onmousedown = (event) => {
      if (event.target.closest('.thumb')) {
        this.startDrag(event.clientX, event.clientY);
        return false; // disable selection start (cursor change)
      };
    }
  }
  startDrag(startClientX, startClientY) {
    this.thumbCoords = this.thumbElem.getBoundingClientRect();
    this.shiftX = startClientX - this.thumbCoords.left;
    this.shiftY = startClientY - this.thumbCoords.top;
    this.sliderCoords = this.elem.getBoundingClientRect();
    let self = this;
    this.removeDocumentMouseMove;
    document.addEventListener('mousemove', function funcMouseMove(e) {
      self.removeDocumentMouseMove = () => document.removeEventListener("mousemove", funcMouseMove);
      self.onDocumentMouseMove.bind(self, e)();
    });
    this.removeDocumentMouseUp;
    document.addEventListener('mouseup', function funcMouseUp(e) {
      self.removeDocumentMouseUp = () => document.removeEventListener("mousemove", funcMouseUp);
      self.onDocumentMouseUp.bind(self, e)();
    });
  }
  moveTo(clientX) {
    // вычесть координату родителя, т.к. position: relative
    let newLeft = clientX - this.shiftX - this.sliderCoords.left;

    // курсор ушёл вне слайдера
    if (newLeft < 0) {
      newLeft = 0;
    }
    let rightEdge = this.elem.offsetWidth - this.thumbElem.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    this.thumbElem.style.left = newLeft + 'px';

    this.elem.dispatchEvent(new CustomEvent('slide', {
      bubbles: true,
      detail: this.positionToValue(newLeft)
    }));
  }
  valueToPosition(value) {
    return this.pixelsPerValue * value;
  }
  positionToValue(left) {
    return Math.round(left / this.pixelsPerValue);
  }
  onDocumentMouseMove(e) {
    this.moveTo(e.clientX);
  }
  onDocumentMouseUp() {
    this.endDrag();
  }
  endDrag() {
    this.removeDocumentMouseMove();
    this.removeDocumentMouseUp();
    this.elem.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      detail: this.positionToValue(parseInt(this.thumbElem.style.left))
    }));
  }
  setValue(value) {
    this.thumbElem.style.left = valueToPosition(value) + 'px';
  }
}