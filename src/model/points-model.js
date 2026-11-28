import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  points = [];

  constructor(pointsApiService) {
    super();
    this.pointsApiService = pointsApiService;
  }

  getPoints() {
    return this.points;
  }

  setPoints(points) {
    this.points = points;
  }

  async updatePoint(point) {
    const updatedPoint = await this.pointsApiService.updatePoint(point);

    const points = this.getPoints().map((currentPoint) =>
      currentPoint.id === updatedPoint.id ? updatedPoint : currentPoint,
    );

    this.setPoints(points);
    this._notify('update', updatedPoint);
  }

  deletePoint(pointId) {
    const points = this.getPoints().filter((point) => point.id !== pointId);

    this.setPoints(points);
    this._notify('delete');
  }

  addPoint(point) {
    this.setPoints([...this.getPoints(), point]);
    this._notify('add');
  }
}
