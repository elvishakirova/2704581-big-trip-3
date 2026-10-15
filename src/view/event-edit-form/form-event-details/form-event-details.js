import { createElement } from '../../../render.js';
import { createEventOffersTemplate } from './event-offers.js';
import { createEventDestinationTemplate } from './event-destination.js';

export function createFormEventDetailsTemplate() {
  return `
    <section class="event__details">
      ${createEventOffersTemplate()}
      ${createEventDestinationTemplate()}
    </section>
  `;
}

export default class FormEventDetails {
  getTemplate() {
    return createFormEventDetailsTemplate();
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
