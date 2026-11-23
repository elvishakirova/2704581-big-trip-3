export function getFilteredPoints(points, filter) {
  const now = Date.now();

  switch (filter) {
    case 'future':
      return points.filter((point) => Date.parse(point.date_from) > now);
    case 'present':
      return points.filter((point) =>
        Date.parse(point.date_from) <= now &&
        Date.parse(point.date_to) >= now,
      );
    case 'past':
      return points.filter((point) => Date.parse(point.date_to) < now);
    default:
      return [...points];
  }
}
