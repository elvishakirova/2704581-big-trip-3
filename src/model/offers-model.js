import { mockOffers } from '../mock/offers.js';

export default class OffersModel {
  offers = [...mockOffers];

  getOffers() {
    return this.offers;
  }
}
