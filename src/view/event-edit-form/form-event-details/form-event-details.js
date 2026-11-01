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
