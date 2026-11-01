import AbstractView from '../../framework/view/abstract-view.js';

function createEventItemListTemplate() {
  return `
    <ul class="trip-events__list">
    </ul>
  `;
}

export default class EventItemList extends AbstractView {
  get template() {
    return createEventItemListTemplate();
  }
}
