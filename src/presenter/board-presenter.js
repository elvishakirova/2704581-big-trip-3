import { render } from '../render.js';
import Sort from '../view/sort/sort.js';
import Form from '../view/event-edit-form/form.js';
import EventList from '../view/event-item-list/event-item-list.js';
import EventItem from '../view/event-item-list/event-item.js';

export default class BoardPresenter {
  sortComponent = new Sort();
  eventListComponent = new EventList();

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
    render(this.sortComponent, this.boardContainer);
    render(this.eventListComponent, this.boardContainer);
    render(new Form({destinations: this.boardDestinations}), this.eventListComponent.getElement());

    for (let i = 0; i < this.boardPoints.length; i++) {
      const point = this.boardPoints[i];

      const destination = this.boardDestinations.find(
        (item) => item.id === point.destination,
      );

      const offersByType = this.boardOffers.find((item) => item.type === point.type);

      render(
        new EventItem({ point, destination, offersByType }),
        this.eventListComponent.getElement(),
      );
    }
  }
}
