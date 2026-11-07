import { render } from '../framework/render.js';
import { createFormSwitcher } from '../utils/form-switcher.js';
import SortView from '../view/sort-view.js';
import EventEditFormView from '../view/event-edit-form/event-edit-form-view.js';
import EventItemListView from '../view/event-item-list/event-item-list-view.js';
import EventItemView from '../view/event-item-list/event-item-view.js';
import NoPointsView from '../view/no-points-view.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  eventListComponent = new EventItemListView();

  constructor({ boardContainer, offersModel, destinationsModel, pointsModel }) {
    this.boardContainer = boardContainer;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardOffers = [...this.offersModel.getOffers()];
    this.boardDestinations = [...this.destinationsModel.getDestinations()];
    this.boardPoints = [...this.pointsModel.getPoints()];

    if (this.boardPoints.length === 0) {
      render(new NoPointsView(), this.boardContainer);
      return;
    }

    render(this.sortComponent, this.boardContainer);
    render(this.eventListComponent, this.boardContainer);

    for (let i = 0; i < this.boardPoints.length; i++) {
      const point = this.boardPoints[i];

      const destination = this.boardDestinations.find(
        (item) => item.id === point.destination,
      );

      const offersByType = this.boardOffers.find(
        (item) => item.type === point.type,
      );

      const eventItemComponent = new EventItemView({ point, destination, offersByType });
      const eventEditComponent = new EventEditFormView({ point, destination, offersByType, destinations: this.boardDestinations });

      const { openForm, closeForm } = createFormSwitcher(
        eventItemComponent,
        eventEditComponent,
      );

      eventItemComponent.setEditClickHandler(openForm);

      eventEditComponent.setFormSubmitHandler((evt) => {
        evt.preventDefault();
        closeForm();
      });

      eventEditComponent.setCloseClickHandler(closeForm);

      render(eventItemComponent, this.eventListComponent.element);
    }
  }
}
