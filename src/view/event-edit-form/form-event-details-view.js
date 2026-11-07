import { createEventOffersTemplate } from './event-offers-view.js';
import { createEventDestinationTemplate } from './event-destination-view.js';

export function createFormEventDetailsTemplate(point, destination, offersByType) {
  return `
    <section class="event__details">
      ${createEventOffersTemplate(point, offersByType)}
      ${createEventDestinationTemplate(destination)}
    </section>
  `;
}
