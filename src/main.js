import { render } from './framework/render.js';
import TripInfoView from './view/header/trip-info-view.js';
import FiltersView from './view/header/filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import PointsModel from './model/points-model.js';

const tripMainElement = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const pointsModel = new PointsModel();

const points = pointsModel.getPoints();
const totalCost = points.reduce(
  (sum, point) => sum + point.base_price,
  0
);

const destinations = destinationsModel.getDestinations();

const sortedPoints = [...points].sort(
  (a, b) => new Date(a.date_from) - new Date(b.date_from)
);

const getCityName = (point) =>
  destinations.find((destination) => destination.id === point.destination)?.name ?? 'Unknown';

const firstPoint = sortedPoints[0];
const lastPoint = sortedPoints[sortedPoints.length - 1];

const title = sortedPoints.length > 0
  ? `${getCityName(firstPoint)} — ${getCityName(lastPoint)}`
  : '';

const dates = sortedPoints.length > 0
  ? `${new Date(firstPoint.date_from).toLocaleDateString('en-GB', {day: 'numeric', month: 'short'})} — ${new Date(lastPoint.date_to).toLocaleDateString('en-GB', {day: 'numeric', month: 'short'})}`
  : '';

tripMainElement.prepend(new TripInfoView({
  title,
  dates,
  cost: totalCost,
}).element);
render(new FiltersView({points}), filterContainer);

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement, offersModel, destinationsModel, pointsModel,
});

boardPresenter.init();
