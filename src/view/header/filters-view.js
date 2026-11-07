import AbstractView from '../../framework/view/abstract-view.js';

const isFuture = (point) => new Date(point.date_from) > new Date();

const isPresent = (point) =>
  new Date(point.date_from) <= new Date() &&
  new Date(point.date_to) >= new Date();

const isPast = (point) => new Date(point.date_to) < new Date();

function createFiltersTemplate(points) {
  const hasFuture = points.some(isFuture);
  const hasPresent = points.some(isPresent);
  const hasPast = points.some(isPast);

  return `
    <div class="trip-controls__filters">
      <h2 class="visually-hidden">Filter events</h2>
      <form class="trip-filters" action="#" method="get">
        <div class="trip-filters__filter">
          <input id="filter-everything" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="everything" checked>
          <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-future" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="future" ${hasFuture ? '' : 'disabled'}>
          <label class="trip-filters__filter-label" for="filter-future">Future</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-present" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="present" ${hasPresent ? '' : 'disabled'}>
          <label class="trip-filters__filter-label" for="filter-present">Present</label>
        </div>

        <div class="trip-filters__filter">
          <input id="filter-past" class="trip-filters__filter-input visually-hidden" type="radio" name="trip-filter" value="past" ${hasPast ? '' : 'disabled'}>
          <label class="trip-filters__filter-label" for="filter-past">Past</label>
        </div>

        <button class="visually-hidden" type="submit">Accept filter</button>
      </form>
    </div>
  `;
}

export default class FilterView extends AbstractView {
  #points = [];

  constructor({points}) {
    super();
    this.#points = points;
  }

  get template() {
    return createFiltersTemplate(this.#points);
  }
}
