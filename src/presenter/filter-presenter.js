import { render } from '../framework/render.js';
import { getFilteredPoints } from '../utils/filter.js';
import FiltersView from '../view/header/filters-view.js';

export default class FilterPresenter {
  constructor({ filterContainer, pointsModel, filterModel }) {
    this.filterContainer = filterContainer;
    this.pointsModel = pointsModel;
    this.filterModel = filterModel;
  }

  init() {
    const filtersView = new FiltersView({
      points: this.pointsModel.getPoints(),
    });

    filtersView.setFilterChangeHandler((filter) => {
      this.filterModel.setFilter(filter);
    });

    render(filtersView, this.filterContainer);

    this.pointsModel.addObserver(() => {
      const points = this.pointsModel.getPoints();

      for (const filter of ['future', 'present', 'past']) {
        const input = filtersView.element.querySelector(`#filter-${filter}`);
        input.disabled = getFilteredPoints(points, filter).length === 0;
      }
    });

    this.filterModel.addObserver((_event, filter) => {
      filtersView.element.querySelector(
        `input[name="trip-filter"][value="${filter}"]`,
      ).checked = true;
    });
  }
}
