import ApiService from './framework/api-service.js';

export default class PointsApiService extends ApiService {
  getPoints() {
    return this._load({ url: 'points' })
      .then(ApiService.parseResponse)
      .then((points) => points.map(this.#adaptToClient));
  }

  getDestinations() {
    return this._load({ url: 'destinations' }).then(ApiService.parseResponse);
  }

  getOffers() {
    return this._load({ url: 'offers' }).then(ApiService.parseResponse);
  }

  async updatePoint(point) {
    const response = await this._load({
      url: `points/${point.id}`,
      method: 'PUT',
      body: JSON.stringify(this.#adaptToServer(point)),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });

    return this.#adaptToClient(await ApiService.parseResponse(response));
  }

  #adaptToClient(point) {
    return { ...point, offers: [...point.offers] };
  }

  #adaptToServer(point) {
    return {
      id: point.id,
      type: point.type,
      destination: point.destination,
      'base_price': point.base_price,
      'date_from': point.date_from,
      'date_to': point.date_to,
      'is_favorite': point.is_favorite,
      offers: point.offers,
    };
  }
}
