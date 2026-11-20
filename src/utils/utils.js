import flatpickr from 'flatpickr';
import dayjs from 'dayjs';

const DATE_FORMAT = 'MMM DD';
const TIME_FORMAT = 'HH:mm';
const MINUTES_IN_HOUR = 60;
const HOURS_IN_DAY = 24;

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function humanizePointDate(date) {
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function humanizePointTime(date) {
  return date ? dayjs(date).format(TIME_FORMAT) : '';
}

function getPointDuration(dateFrom, dateTo) {
  const totalMinutes = dayjs(dateTo).diff(dayjs(dateFrom), 'minute');
  const totalHours = Math.floor(totalMinutes / MINUTES_IN_HOUR);
  const days = Math.floor(totalHours / HOURS_IN_DAY);
  const hours = totalHours % HOURS_IN_DAY;
  const minutes = totalMinutes % MINUTES_IN_HOUR;

  const formattedMinutes = `${String(minutes).padStart(2, '0')}M`;
  const formattedHours = `${String(hours).padStart(2, '0')}H`;

  if (days > 0) {
    return `${String(days).padStart(2, '0')}D ${formattedHours} ${formattedMinutes}`;
  }

  if (totalHours > 0) {
    return `${formattedHours} ${formattedMinutes}`;
  }

  return formattedMinutes;
}

function humanizeFormDate(date) {
  return date ? flatpickr.formatDate(new Date(date), 'd/m/y H:i') : '';
}

export { getRandomArrayElement, getRandomInteger, humanizePointDate, humanizePointTime, getPointDuration, humanizeFormDate };
