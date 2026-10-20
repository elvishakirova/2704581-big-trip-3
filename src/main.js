import { render } from './render.js';
import TripInfo from './view/header/trip-info.js';
import Filters from './view/header/filters.js';
import BoardPresenter from './presenter/board-presenter.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import PointsModel from './model/points-model.js';

const tripMainElement = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

tripMainElement.prepend(new TripInfo().getElement());
render(new Filters(), filterContainer);

const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const pointsModel = new PointsModel();

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement, offersModel, destinationsModel, pointsModel,
});

boardPresenter.init();
