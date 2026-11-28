export function getFilteredPoints(points, filter) {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const tomorrowStart = new Date(todayStart);
  tomorrowStart.setDate(tomorrowStart.getDate() + 1);

  switch (filter) {
    case 'future':
      return points.filter((point) =>
        Date.parse(point.date_from) >= tomorrowStart.getTime(),
      );
    case 'present':
      return points.filter((point) =>
        Date.parse(point.date_from) < tomorrowStart.getTime() &&
        Date.parse(point.date_to) >= todayStart.getTime(),
      );
    case 'past':
      return points.filter((point) =>
        Date.parse(point.date_to) < todayStart.getTime(),
      );
    default:
      return [...points];
  }
}
