import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';

const tripMainElement = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const pointsModel = new PointsModel();
const filterModel = new FilterModel();

const tripInfoPresenter = new TripInfoPresenter({
  tripContainer: tripMainElement,
  pointsModel,
  destinationsModel,
});

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement,
  offersModel,
  destinationsModel,
  pointsModel,
  filterModel,
});

tripInfoPresenter.init();

const filterPresenter = new FilterPresenter({
  filterContainer,
  pointsModel,
  filterModel,
});

filterPresenter.init();

boardPresenter.init();

const newEventButton = document.querySelector('.trip-main__event-add-btn');

newEventButton.addEventListener('click', () => {
  boardPresenter.openNewPoint(newEventButton);
});
