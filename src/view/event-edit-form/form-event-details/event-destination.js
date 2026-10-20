import { createElement } from '../../../render.js';

function createPhotoTemplate(picture) {
  return `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`;
}

export function createEventDestinationTemplate(destination) {
  const {description = '', pictures = []} = destination ?? {};

  const photosTemplate = pictures.map(createPhotoTemplate).join('');

  if (!description && pictures.length === 0) {
    return '';
  }

  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container">
          <div class="event__photos-tape">
            ${photosTemplate}
          </div>
          </div>
    </section>
  `;
}

export default class EventDestination {
  getTemplate() {
    return createEventDestinationTemplate();
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
