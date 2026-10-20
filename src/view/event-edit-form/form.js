import { createElement } from '../../render.js';
import { createFormHeaderTemplate } from './form-header.js';
import {createFormEventDetailsTemplate } from './form-event-details/form-event-details.js';

function createFormTemplate(point, destination, offersByType, destinations) {
  return `
    <form class="event event--edit" action="#" method="post">
      ${createFormHeaderTemplate(point, destination, destinations)}
      ${createFormEventDetailsTemplate(point, destination, offersByType)}
    </form>
  `;
}

export default class Form {
  constructor({ point = null, destination = null, offersByType = null, destinations = null } = {}) {
    this.point = point;
    this.destination = destination;
    this.offersByType = offersByType;
    this.destinations = destinations;
  }

  getTemplate() {
    return createFormTemplate(this.point, this.destination, this.offersByType, this.destinations);
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
