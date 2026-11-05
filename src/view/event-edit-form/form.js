import AbstractView from '../../framework/view/abstract-view.js';
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

export default class Form extends AbstractView {
  #point = null;
  #destination = null;
  #offersByType = null;
  #destinations = null;

  constructor({ point = null, destination = null, offersByType = null, destinations = null } = {}) {
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offersByType = offersByType;
    this.#destinations = destinations;
  }

  get template() {
    return createFormTemplate(this.#point, this.#destination, this.#offersByType, this.#destinations);
  }

  setFormSubmitHandler(callback) {
    this.element.addEventListener('submit', callback);
  }

  setCloseClickHandler(callback) {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', callback);
  }
}
