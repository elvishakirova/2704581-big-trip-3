import { render } from '../framework/render.js';
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

    this.filterModel.addObserver((_event, filter) => {
      filtersView.element.querySelector(
        `input[name="trip-filter"][value="${filter}"]`,
      ).checked = true;
    });
  }
}
