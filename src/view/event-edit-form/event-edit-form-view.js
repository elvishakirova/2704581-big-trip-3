import AbstractStatefulView from '../../framework/view/abstract-stateful-view.js';
import { createFormHeaderTemplate } from './form-header-view.js';
import { createFormEventDetailsTemplate } from './form-event-details-view.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
  #datepickers = [];

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

    if (this.element.isConnected) {
      this.initDatepickers();
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
    this._setState({ 'base_price': evt.target.value });
  };

  initDatepickers() {
    const dateFields = [
      { name: 'event-start-time', stateKey: 'date_from' },
      { name: 'event-end-time', stateKey: 'date_to' },
    ];

    this.#datepickers = dateFields.map(({ name, stateKey }) => {
      const input = this.element.querySelector(`[name="${name}"]`);
      const currentDate = this._state[stateKey];

      return flatpickr(input, {
        enableTime: true,
        'time_24hr': true,
        dateFormat: 'd/m/y H:i',
        defaultDate: currentDate ? new Date(currentDate) : undefined,
        onChange: ([date], _dateString, picker) => {
          const isStart = stateKey === 'date_from';
          const otherDate = this._state[isStart ? 'date_to' : 'date_from'];

          if (date && otherDate) {
            const otherTime = new Date(otherDate);
            const isInvalid = isStart ? date > otherTime : date < otherTime;

            if (isInvalid) {
              const previousDate = this._state[stateKey];
              picker.setDate(previousDate ? new Date(previousDate) : [], false);
              return;
            }
          }

          this._setState({ [stateKey]: date?.toISOString() ?? '' });
        },
      });
    });
  }

  destroyDatepickers() {
    this.#datepickers.forEach((datepicker) => datepicker.destroy());
    this.#datepickers = [];
  }

  removeElement() {
    this.destroyDatepickers();
    super.removeElement();
  }
}
