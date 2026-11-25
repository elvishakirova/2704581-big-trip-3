
import { render, replace, remove } from '../framework/render.js';
import { UserAction } from '../const.js';
import EventItemView from '../view/event-item-list/event-item-view.js';
import EventEditFormView from '../view/event-edit-form/event-edit-form-view.js';

export default class PointPresenter {
  point = null;
  eventItemComponent = null;
  eventEditComponent = null;
  isEditing = false;

  constructor({ pointContainer, destinations, offers, onDataChange, onModeChange }) {
    this.pointContainer = pointContainer;
    this.destinations = destinations;
    this.offers = offers;
    this.onDataChange = onDataChange;
    this.onModeChange = onModeChange;
  }

  init(point) {
    this.point = point;

    const previousEventItemComponent = this.eventItemComponent;

    const destination = this.destinations.find(
      (item) => item.id === point.destination,
    );

    const offersByType = this.offers.find(
      (item) => item.type === point.type,
    );

    this.eventItemComponent = new EventItemView({
      point,
      destination,
      offersByType,
    });

    this.eventItemComponent.setEditClickHandler(this.openForm);
    this.eventItemComponent.setFavoriteClickHandler(this.handleFavoriteClick);

    if (previousEventItemComponent === null) {
      render(this.eventItemComponent, this.pointContainer);
    } else {
      replace(this.eventItemComponent, previousEventItemComponent);
    }
  }

  handleFavoriteClick = (evt) => {
    evt.preventDefault();

    this.onDataChange(UserAction.UPDATE_POINT, {
      ...this.point,
      'is_favorite': !this.point.is_favorite,
    });
  };

  closeForm = () => {
    if (!this.isEditing) {
      return;
    }

    replace(this.eventItemComponent, this.eventEditComponent);
    remove(this.eventEditComponent);
    this.eventEditComponent = null;
    document.removeEventListener('keydown', this.onEscKeyDown);
    this.isEditing = false;
  };

  onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      this.closeForm();
    }
  };

  openForm = () => {
    if (this.isEditing) {
      return;
    }

    this.onModeChange();

    const point = this.point;
    const destination = this.destinations.find(
      (item) => item.id === point.destination,
    );
    const offersByType = this.offers.find(
      (item) => item.type === point.type,
    );

    this.eventEditComponent = new EventEditFormView({
      point,
      destination,
      offersByType,
      destinations: this.destinations,
      offers: this.offers,
    });

    this.eventEditComponent.setFormSubmitHandler((evt) => {
      evt.preventDefault();

      const updatedPoint = this.eventEditComponent.getPointData();

      if (updatedPoint === null) {
        return;
      }

      this.onDataChange(UserAction.UPDATE_POINT, updatedPoint);
    });

    this.eventEditComponent.setCloseClickHandler(this.closeForm);

    this.eventEditComponent.setDeleteClickHandler((evt) => {
      evt.preventDefault();
      this.onDataChange(UserAction.DELETE_POINT, this.point);
    });

    replace(this.eventEditComponent, this.eventItemComponent);
    this.eventEditComponent.initDatepickers();
    document.addEventListener('keydown', this.onEscKeyDown);
    this.isEditing = true;
  };

  resetView = () => {
    this.closeForm();
  };

  destroy() {
    this.resetView();
    remove(this.eventItemComponent);
    remove(this.eventEditComponent);
  }
}
