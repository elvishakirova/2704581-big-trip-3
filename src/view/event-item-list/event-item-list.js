import { createElement } from '../../render.js';
import { createEventItemTemplate } from './event-item.js';

function createEventItemListTemplate() {
  return `
    <ul class="trip-events__list">
      ${createEventItemTemplate()}
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
