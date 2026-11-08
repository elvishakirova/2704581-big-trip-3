import { render } from '../framework/render.js';
import SortView from '../view/sort-view.js';
import EventItemListView from '../view/event-item-list/event-item-list-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  pointPresenters = new Map();
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

      const pointPresenter = new PointPresenter({
        pointContainer: this.eventListComponent.element,
        destinations: this.boardDestinations,
        onDataChange: this.handlePointChange,
        onModeChange: this.handleModeChange,
      });

      pointPresenter.init(point, destination, offersByType);

      this.pointPresenters.set(point.id, pointPresenter);
    }
  }

  handlePointChange = (updatedPoint) => {
    this.boardPoints = this.boardPoints.map((point) =>
      point.id === updatedPoint.id ? updatedPoint : point,
    );

    this.pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  handleModeChange = () => {
    this.pointPresenters.forEach((presenter) => presenter.resetView());
  };
}
