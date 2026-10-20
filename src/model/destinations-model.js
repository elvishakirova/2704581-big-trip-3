import { mockDestinations } from '../mock/destinations.js';

export default class DestinationsModel {
  destinations = [...mockDestinations];

  getDestinations() {
    return this.destinations;
  }
}
