import { createElement } from '../../render.js';
import { humanizePointDate, humanizePointTime, getPointDuration } from '../../utils.js';

function createOfferTemplate(offer) {
  return `
    <li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>
  `;
}

export function createEventItemTemplate(point, destination, offersByType) {
  const {date_from, date_to, is_favorite} = point;

  const date = humanizePointDate(date_from);
  const startTime = humanizePointTime(date_from);
  const endTime = humanizePointTime(date_to);
  const duration = getPointDuration(date_from, date_to);

  const favoriteClassName = is_favorite
    ? 'event__favorite-btn event__favorite-btn--active'
    : 'event__favorite-btn';

  const selectedOffers = offersByType.offers.filter((offer) =>
    point.offers.includes(offer.id),
  );

  const offersTemplate = selectedOffers.map(createOfferTemplate).join('');

  return `
    <li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${date_from}">${date}</time>
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type}.png" alt="Event type icon">
          </div>
          <h3 class="event__title">${point.type} ${destination.name}</h3>
          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${date_from}">${startTime}</time>
              &mdash;
              <time class="event__end-time" datetime="${date_to}">${endTime}</time>
            </p>
            <p class="event__duration">${duration}</p>
          </div>
          <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${point.base_price}</span>
          </p>
          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${offersTemplate}
          </ul>
          <button class="${favoriteClassName}" type="button">
            <span class="visually-hidden">Add to favorite</span>
            <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
            </svg>
          </button>
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
      </div>
    </li>
  `;
}

export default class EventItem {
  constructor({point, destination, offersByType}) {
    this.point = point;
    this.destination = destination;
    this.offersByType = offersByType;
  }

  getTemplate() {
    return createEventItemTemplate(this.point, this.destination, this.offersByType);
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
