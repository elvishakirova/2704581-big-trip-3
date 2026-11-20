import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { createFormHeaderTemplate } from './form-header-view.js';
import {createFormEventDetailsTemplate } from './form-event-details-view.js';

function createFormTemplate(point, destination, offersByType, destinations) {
  return `
    <form class="event event--edit" action="#" method="post">
      ${createFormHeaderTemplate(point, destination, destinations)}
      ${createFormEventDetailsTemplate(point, destination, offersByType)}
    </form>
  `;
}

export default class EventEditFormView extends AbstractStatefulView {
  #destination = null;
  #offersByType = null;
  #destinations = null;
  #formSubmitHandler = null;
  #closeClickHandler = null;
  #offers = [];

  constructor({
    point = null,
    destination = null,
    offersByType = null,
    destinations = null,
    offers = [],
  } = {}) {
    super();

    this._setState({ ...point });
    this.#destination = destination;
    this.#offersByType = offersByType;
    this.#destinations = destinations;
    this.#offers = offers;

    this._restoreHandlers();
  }

  get template() {
    return createFormTemplate(
      this._state,
      this.#destination,
      this.#offersByType,
      this.#destinations,
    );
  }

  setFormSubmitHandler(callback) {
    this.#formSubmitHandler = callback;
    this.element.addEventListener('submit', callback);
  }

  setCloseClickHandler(callback) {
    this.#closeClickHandler = callback;
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', callback);
  }

  _restoreHandlers() {
    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.handleTypeChange);

    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.handleDestinationChange);

    this.element
      .querySelector('.event__input--price')
      .addEventListener('input', this.handlePriceInput);

    if (this.#formSubmitHandler) {
      this.element.addEventListener('submit', this.#formSubmitHandler);
    }

    if (this.#closeClickHandler) {
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#closeClickHandler);
    }
  }

  handleTypeChange = (evt) => {
    this.#offersByType = this.#offers.find(
      (offer) => offer.type === evt.target.value,
    );

    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  handleDestinationChange = (evt) => {
    const destination = this.#destinations.find(
      (item) => item.name === evt.target.value,
    );

    if (!destination) {
      return;
    }

    this.#destination = destination;

    this.updateElement({
      destination: destination.id,
    });
  };

  handlePriceInput = (evt) => {
    this._setState({'base_price': evt.target.value});
  };
}
