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
    this.setValue(0);
  }
  init() {
    this.elem.ondragstart = () => false;
    this.elem.onmousedown = (event) => {
      if (event.target.closest('.thumb')) {
        this.startDrag(event.clientX, event.clientY);
        return false; // disable selection start (cursor change)
      };
    };
  }
  startDrag(startClientX, startClientY) {
    this.thumbCoords = this.thumbElem.getBoundingClientRect();
    this.shiftX = startClientX - this.thumbCoords.left;
    this.shiftY = startClientY - this.thumbCoords.top;
    this.sliderCoords = this.elem.getBoundingClientRect();
    document.addEventListener('mousemove', this.funcMouseMove = (e) => {
      this.onDocumentMouseMove(e.clientX);
    });
    document.addEventListener('mouseup', this.funcMouseUp = (e) => {
      this.onDocumentMouseUp();
    });
  }
  onDocumentMouseMove(clientX) {
    // вычесть координату родителя, т.к. position: relative
    let newLeft = clientX - this.shiftX - this.sliderCoords.left;
    // курсор ушёл вне слайдера
    if (newLeft < 0) {
      newLeft = 0;
    };
    let rightEdge = this.elem.offsetWidth - this.thumbElem.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    };
    this.thumbElem.style.left = newLeft + 'px';
    this.elem.dispatchEvent(new CustomEvent('slide', {
      bubbles: true,
      detail: this.positionToValue(newLeft)
    }));

  }
  onDocumentMouseUp() {
    document.removeEventListener("mouseup", this.funcMouseUp);
    document.removeEventListener("mousemove", this.funcMouseMove);
    this.elem.dispatchEvent(new CustomEvent('change', {
      bubbles: true,
      detail: this.positionToValue(parseInt(this.thumbElem.style.left))
    }));
  }
  positionToValue(left) {
    return Math.round(left / this.pixelsPerValue);
  }
  setValue(value) {
    this.thumbElem.style.left = this.pixelsPerValue * value + 'px';
  }
}