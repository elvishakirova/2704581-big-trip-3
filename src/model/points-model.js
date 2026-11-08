import { getRandomPoint } from '../mock/points.js';

const POINT_COUNT = 10;

export default class PointsModel {
  points = Array.from(
    new Map(
      Array.from({ length: POINT_COUNT }, getRandomPoint).map((point) => [
        point.id,
        point,
      ]),
    ).values(),
  );

  getPoints() {
    return this.points;
  }
}
