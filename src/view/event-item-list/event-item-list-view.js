import AbstractView from '../../framework/view/abstract-view.js';

function createEventItemListTemplate() {
  return `
    <ul class="trip-events__list">
    </ul>
  `;
}

export default class EventItemListView extends AbstractView {
  get template() {
    return createEventItemListTemplate();
  }
}
