import { render, replace } from '../framework/render.js';
import EventItemView from '../view/event-item-list/event-item-view.js';
import EventEditFormView from '../view/event-edit-form/event-edit-form-view.js';

export default class PointPresenter {
  point = null;
  destination = null;
  offersByType = null;

  eventItemComponent = null;
  eventEditComponent = null;

  constructor({ pointContainer, destinations, onDataChange, onModeChange }) {
    this.pointContainer = pointContainer;
    this.destinations = destinations;
    this.onDataChange = onDataChange;
    this.onModeChange = onModeChange;
  }

  init(
    point,
    destination = this.destination,
    offersByType = this.offersByType,
  ) {
    this.point = point;
    this.destination = destination;
    this.offersByType = offersByType;

    const previousEventItemComponent = this.eventItemComponent;

    this.eventItemComponent = new EventItemView({
      point,
      destination,
      offersByType,
    });

    this.eventEditComponent = new EventEditFormView({
      point,
      destination,
      offersByType,
      destinations: this.destinations,
    });

    this.eventItemComponent.setEditClickHandler(this.openForm);

    this.eventItemComponent.setFavoriteClickHandler((evt) => {
      evt.preventDefault();

      this.onDataChange({
        ...point,
        'is_favorite': !point.is_favorite,
      });
    });

    this.eventEditComponent.setFormSubmitHandler((evt) => {
      evt.preventDefault();
      this.closeForm();
    });

    this.eventEditComponent.setCloseClickHandler(this.closeForm);

    if (previousEventItemComponent === null) {
      render(this.eventItemComponent, this.pointContainer);
    } else {
      replace(this.eventItemComponent, previousEventItemComponent);
    }
  }

  isEditing = false;

  closeForm = () => {
    if (!this.isEditing) {
      return;
    }

    replace(this.eventItemComponent, this.eventEditComponent);
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

    replace(this.eventEditComponent, this.eventItemComponent);
    document.addEventListener('keydown', this.onEscKeyDown);
    this.isEditing = true;
  };

  resetView = () => {
    this.closeForm();
  };
}
