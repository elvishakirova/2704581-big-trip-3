import { render } from '../render.js';
import Sort from '../view/sort/sort.js';
import Form from '../view/event-edit-form/form.js';
import EventList from '../view/event-item-list/event-item-list.js';
import EventItem from '../view/event-item-list/event-item.js';

export default class BoardPresenter {
  sortComponent = new Sort();
  eventListComponent = new EventList();

  constructor({boardContainer}) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(this.sortComponent, this.boardContainer);
    render(this.eventListComponent, this.boardContainer);
    render(new Form(), this.eventListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventItem(), this.eventListComponent.getElement());
    }
  }
}
