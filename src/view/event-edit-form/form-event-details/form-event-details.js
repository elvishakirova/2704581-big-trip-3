import { createElement } from '../../../render.js';
import { createEventOffersTemplate } from './event-offers.js';
import { createEventDestinationTemplate } from './event-destination.js';

export function createFormEventDetailsTemplate(point, destination, offersByType) {
  return `
    <section class="event__details">
      ${createEventOffersTemplate(point, offersByType)}
      ${createEventDestinationTemplate(destination)}
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
