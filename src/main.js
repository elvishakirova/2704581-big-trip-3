import { render } from './framework/render.js';
import FiltersView from './view/header/filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import PointsModel from './model/points-model.js';

const tripMainElement = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const pointsModel = new PointsModel();

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
});

tripInfoPresenter.init();

render(new FiltersView({
  points: pointsModel.getPoints(),
}), filterContainer);

boardPresenter.init();
