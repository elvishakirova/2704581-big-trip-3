import flatpickr from 'flatpickr';

const DATE_FORMAT = 'M j';
const TIME_FORMAT = 'H:i';

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function humanizePointDate(date) {
  return date ? flatpickr.formatDate(new Date(date), DATE_FORMAT) : '';
}

function humanizePointTime(date) {
  return date ? flatpickr.formatDate(new Date(date), TIME_FORMAT) : '';
}

function getPointDuration(dateFrom, dateTo) {
  const difference = new Date(dateTo) - new Date(dateFrom);
  const minutes = Math.floor(difference / 60000);

  return `${minutes}M`;
}

function humanizeFormDate(date) {
  return date ? flatpickr.formatDate(new Date(date), 'd/m/y H:i') : '';
}

export { getRandomArrayElement, getRandomInteger, humanizePointDate, humanizePointTime, getPointDuration, humanizeFormDate };
