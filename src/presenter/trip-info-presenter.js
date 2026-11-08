import TripInfoView from '../view/header/trip-info-view.js';

export default class TripInfoPresenter {
  constructor({ tripContainer, pointsModel, destinationsModel }) {
    this.tripContainer = tripContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    const points = this.pointsModel.getPoints();
    const destinations = this.destinationsModel.getDestinations();

    const totalCost = points.reduce(
      (sum, point) => sum + point.base_price,
      0
    );

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

    this.tripContainer.prepend(new TripInfoView({
      title,
      dates,
      cost: totalCost,
    }).element);
  }
}
