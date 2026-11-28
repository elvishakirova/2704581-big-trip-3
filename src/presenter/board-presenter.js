import { render, remove, RenderPosition } from '../framework/render.js';
import { getFilteredPoints } from '../utils/filter.js';
import { UserAction } from '../const.js';
import SortView from '../view/sort-view.js';
import EventItemListView from '../view/event-item-list/event-item-list-view.js';
import NoPointsView from '../view/no-points-view.js';
import PointPresenter from './point-presenter.js';
import EventEditFormView from '../view/event-edit-form/event-edit-form-view.js';

export default class BoardPresenter {
  sortComponent = new SortView();
  pointPresenters = new Map();
  eventListComponent = new EventItemListView();
  currentSortType = 'sort-day';
  newPointForm = null;
  newEventButton = null;

  constructor({
    boardContainer,
    offersModel,
    destinationsModel,
    pointsModel,
    filterModel,
  }) {
    this.boardContainer = boardContainer;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
    this.pointsModel = pointsModel;
    this.pointsModel.addObserver(this.handlePointsModelChange);
    this.filterModel = filterModel;
    this.filterModel.addObserver(this.handleFilterChange);
  }

  init() {
    this.boardOffers = [...this.offersModel.getOffers()];
    this.boardDestinations = [...this.destinationsModel.getDestinations()];
    this.sortComponent.setSortChangeHandler(this.handleSortChange);

    this.renderBoard();
  }

  renderBoard() {
    this.closeNewPoint();
    this.clearPoints();
    this.boardPoints = this.getBoardPoints();

    this.boardContainer.querySelector('.trip-events__msg')?.remove();

    if (this.boardPoints.length === 0) {
      this.sortComponent.element.remove();
      this.eventListComponent.element.remove();
      render(
        new NoPointsView(this.filterModel.getFilter()),
        this.boardContainer,
      );
      return;
    }

    render(this.sortComponent, this.boardContainer);
    render(this.eventListComponent, this.boardContainer);
    this.sortPoints();
    this.renderPoints();
  }

  openNewPoint(newEventButton) {
    if (this.newPointForm) {
      return;
    }

    if (this.filterModel.getFilter() === 'everything') {
      this.handleFilterChange();
    } else {
      this.filterModel.setFilter('everything');
    }

    if (this.boardPoints.length === 0) {
      this.boardContainer.querySelector('.trip-events__msg')?.remove();
      render(this.eventListComponent, this.boardContainer);
    }

    const point = {
      type: 'flight',
      destination: null,
      'date_from': '',
      'date_to': '',
      'base_price': 0,
      'is_favorite': false,
      offers: [],
    };

    this.newPointForm = new EventEditFormView({
      point,
      destinations: this.boardDestinations,
      offers: this.boardOffers,
      offersByType: this.boardOffers.find((offer) => offer.type === point.type),
      isNew: true,
    });

    this.newPointForm.setDeleteClickHandler((evt) => {
      evt.preventDefault();
      this.renderBoard();
    });

    this.newPointForm.setFormSubmitHandler((evt) => {
      evt.preventDefault();

      const pointData = this.newPointForm.getPointData();

      if (pointData === null) {
        return;
      }

      this.handlePointChange(UserAction.ADD_POINT, {
        ...pointData,
        id: crypto.randomUUID(),
      });
    });

    const listItem = document.createElement('li');
    listItem.classList.add('trip-events__item');
    this.eventListComponent.element.prepend(listItem);
    render(this.newPointForm, listItem, RenderPosition.AFTERBEGIN);
    this.newPointForm.initDatepickers();

    this.newEventButton = newEventButton;
    this.newEventButton.disabled = true;
    document.addEventListener('keydown', this.handleNewPointEsc);
  }

  closeNewPoint() {
    if (!this.newPointForm) {
      return;
    }

    const listItem = this.newPointForm.element.parentElement;
    remove(this.newPointForm);
    listItem.remove();

    this.newPointForm = null;
    this.newEventButton.disabled = false;
    this.newEventButton = null;
    document.removeEventListener('keydown', this.handleNewPointEsc);
  }

  handleNewPointEsc = (evt) => {
    if (evt.key === 'Escape') {
      this.renderBoard();
    }
  };

  renderPoints() {
    for (const point of this.boardPoints) {
      const pointPresenter = new PointPresenter({
        pointContainer: this.eventListComponent.element,
        destinations: this.boardDestinations,
        offers: this.boardOffers,
        onDataChange: this.handlePointChange,
        onModeChange: this.handleModeChange,
      });

      pointPresenter.init(point);

      this.pointPresenters.set(point.id, pointPresenter);
    }
  }

  clearPoints() {
    this.pointPresenters.forEach((presenter) => presenter.destroy());
    this.pointPresenters.clear();
  }

  sortPoints() {
    switch (this.currentSortType) {
      case 'sort-day':
        this.boardPoints.sort(
          (a, b) => new Date(a.date_from) - new Date(b.date_from),
        );
        break;

      case 'sort-time':
        this.boardPoints.sort(
          (a, b) =>
            new Date(b.date_to) -
            new Date(b.date_from) -
            (new Date(a.date_to) - new Date(a.date_from)),
        );
        break;

      case 'sort-price':
        this.boardPoints.sort((a, b) => b.base_price - a.base_price);
        break;
    }
  }

  handlePointChange = async (action, point) => {
    switch (action) {
      case UserAction.UPDATE_POINT:
        try {
          await this.pointsModel.updatePoint(point);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('Не удалось сохранить точку маршрута', error);
        }
        break;
      case UserAction.DELETE_POINT:
        this.pointsModel.deletePoint(point.id);
        break;
      case UserAction.ADD_POINT:
        this.pointsModel.addPoint(point);
        break;
    }
  };

  handlePointsModelChange = (event, updatedPoint) => {
    if (event === 'delete' || event === 'add') {
      this.renderBoard();
      return;
    }

    const pointPresenter = this.pointPresenters.get(updatedPoint.id);

    if (pointPresenter?.isEditing) {
      this.renderBoard();
      return;
    }

    this.boardPoints = this.getBoardPoints();
    this.sortPoints();
    pointPresenter?.init(updatedPoint);
  };

  handleModeChange = () => {
    this.closeNewPoint();
    this.pointPresenters.forEach((presenter) => presenter.resetView());
  };

  handleSortChange = (sortType) => {
    if (this.currentSortType === sortType) {
      return;
    }

    this.currentSortType = sortType;

    this.sortPoints();
    this.clearPoints();
    this.renderPoints();
  };

  getBoardPoints() {
    return getFilteredPoints(
      this.pointsModel.getPoints(),
      this.filterModel.getFilter(),
    );
  }

  handleFilterChange = () => {
    this.currentSortType = 'sort-day';
    this.sortComponent.element.querySelector('#sort-day').checked = true;

    this.renderBoard();
  };
}
