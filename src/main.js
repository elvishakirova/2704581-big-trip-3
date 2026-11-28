import { render, remove } from './framework/render.js';
import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import TripInfoPresenter from './presenter/trip-info-presenter.js';
import OffersModel from './model/offers-model.js';
import DestinationsModel from './model/destinations-model.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service.js';
import LoadingView from './view/loading-view.js';

const END_POINT = 'https://21.objects.pages.academy/big-trip';
const AUTHORIZATION = 'Basic 8f31c7d9e42b60a5';
const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const tripMainElement = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();
const pointsModel = new PointsModel(pointsApiService);
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

const filterPresenter = new FilterPresenter({
  filterContainer,
  pointsModel,
  filterModel,
});

const newEventButton = document.querySelector('.trip-main__event-add-btn');

newEventButton.addEventListener('click', () => {
  boardPresenter.openNewPoint(newEventButton);
});

async function init() {
  const loadingView = new LoadingView();

  newEventButton.disabled = true;
  render(loadingView, tripEventsElement);

  try {
    const [points, destinations, offers] = await Promise.all([
      pointsApiService.getPoints(),
      pointsApiService.getDestinations(),
      pointsApiService.getOffers(),
    ]);

    destinationsModel.setDestinations(destinations);
    offersModel.setOffers(offers);
    pointsModel.setPoints(points);
    newEventButton.disabled = false;
  } catch {
    // Модели остаются пустыми, и список покажет заглушку.
  } finally {
    remove(loadingView);
  }

  if (pointsModel.getPoints().length > 0) {
    tripInfoPresenter.init();
  }

  filterPresenter.init();
  boardPresenter.init();
}

init();
