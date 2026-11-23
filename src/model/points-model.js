import { mockEvents } from '../mock/points.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  points = [...mockEvents];

  getPoints() {
    return this.points;
  }

  setPoints(points) {
    this.points = points;
  }

  updatePoint(updatedPoint) {
    const points = this.getPoints().map((point) =>
      point.id === updatedPoint.id ? updatedPoint : point,
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
