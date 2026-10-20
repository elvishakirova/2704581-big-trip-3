import { createElement } from '../../../render.js';

function createOfferTemplate(offer, selectedOffers) {
  const isChecked = selectedOffers.includes(offer.id) ? 'checked' : '';

  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden"
        id="event-offer-${offer.id}"
        type="checkbox"
        name="event-offer-${offer.id}"
        ${isChecked}>
      <label class="event__offer-label" for="event-offer-${offer.id}">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>
  `;
}

export function createEventOffersTemplate(point, offersByType) {
  const selectedOffers = point?.offers ?? [];
  const availableOffers = offersByType?.offers ?? [];

  const offersTemplate = availableOffers
    .map((offer) => createOfferTemplate(offer, selectedOffers))
    .join('');

  if (availableOffers.length === 0) {
    return '';
  }

  return `
    <section class="event__section event__section--offers">
      <h3 class="event__section-title event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
        ${offersTemplate}
      </div>
    </section>
  `;
}

export default class EventOffers {
  getTemplate() {
    return createEventOffersTemplate();
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
