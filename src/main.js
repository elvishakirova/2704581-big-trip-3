import { render } from './render.js';
import TripInfo from './view/header/trip-info.js';
import Filters from './view/header/filters.js';
import BoardPresenter from './presenter/board-presenter.js';

const tripMainElement = document.querySelector('.trip-main');
const filterContainer = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

tripMainElement.prepend(new TripInfo().getElement());
render(new Filters(), filterContainer);

const boardPresenter = new BoardPresenter({
  boardContainer: tripEventsElement
});

boardPresenter.init();
