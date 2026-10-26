import { createElement } from '../../render.js';

function createEventItemListTemplate() {
  return `
    <ul class="trip-events__list">
    </ul>
  `;
}

export default class EventItemList {
  getTemplate() {
    return createEventItemListTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
