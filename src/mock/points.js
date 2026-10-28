import { getRandomArrayElement } from '../utils.js';
import { mockDestinations } from './destinations.js';

const mockEvents = [
  {
    id: '4dc1c137-fa92-422c-a92d-b8c7b5e0098e',
    'base_price': 4024,
    'date_from': '2026-10-09T02:48:06.011Z',
    'date_to': '2026-10-09T13:59:06.011Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'is_favorite': true,
    'offers': [
      'e2a8a297-e331-4ad5-8c83-2fad1c7a4653',
      '18faddb4-e124-45a6-a2be-e24ed4b8c1ab'
    ],
    'type': 'restaurant',
  },
  {
    id: '798fa9eb-e60b-4389-9915-3233da0629fb',
    'base_price': 1435,
    'date_from': '2026-10-10T02:09:06.011Z',
    'date_to': '2026-10-11T05:03:06.011Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing',
  },
  {
    id: '43db3849-60a0-4f9a-b526-46c18049ffde',
    'base_price': 8967,
    'date_from': '2026-10-12T07:47:06.011Z',
    'date_to': '2026-10-13T00:11:06.011Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'is_favorite': true,
    'offers': [],
    'type': 'sightseeing',
  },
  {
    id: '0f9f525f-ade6-4f93-9fbd-5ebc73d5606b',
    'base_price': 1067,
    'date_from': '2026-10-14T13:08:06.011Z',
    'date_to': '2026-10-15T10:01:06.011Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'is_favorite': false,
    'offers': [
      '8e87ca2e-1cc3-4ff1-afbc-8f22ff07bda2',
      '0b6cc0b9-ef76-4594-9347-9b42c250d748',
      '718ad9f2-a5c7-482a-b31e-4998a1455bce'
    ],
    'type': 'train',
  },
  {
    id: '8eb26129-ca4e-4126-ae35-a67fa974816b',
    'base_price': 2965,
    'date_from': '2026-10-16T18:56:06.011Z',
    'date_to': '2026-10-17T19:16:06.011Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'is_favorite': false,
    'offers': [],
    'type': 'check-in',
  },
  {
    id: '78e32336-d7e7-423d-b49b-b7582c444a94',
    'base_price': 1991,
    'date_from': '2026-10-18T17:18:06.011Z',
    'date_to': '2026-10-19T20:28:06.011Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'is_favorite': true,
    'offers': [],
    'type': 'restaurant',
  },
  {
    id: '5434b788-f590-4419-b540-4393312842d4',
    'base_price': 6990,
    'date_from': '2026-10-21T08:40:06.011Z',
    'date_to': '2026-10-21T17:26:06.011Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'is_favorite': false,
    'offers': [
      '7af025d2-aca6-447b-8fd5-df67b157b9d3',
      '95515281-6105-4f08-a3f1-2b3e8398beb3'
    ],
    'type': 'check-in',
  },
  {
    id: 'd2438655-acee-44c5-89a4-07e4ccec76a4',
    'base_price': 4749,
    'date_from': '2026-10-22T07:39:06.011Z',
    'date_to': '2026-10-22T14:23:06.011Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'is_favorite': true,
    'offers': [
      'b20edbca-3faf-46d1-a30e-2cba4077326f',
      '3145e8db-a023-40d1-9572-086c3ceacfa7'
    ],
    'type': 'drive',
  },
  {
    id: '19a39343-5384-4345-bd96-2de7cde2372b',
    'base_price': 9844,
    'date_from': '2026-10-23T05:44:06.011Z',
    'date_to': '2026-10-24T04:53:06.011Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'is_favorite': true,
    'offers': [],
    'type': 'ship',
  },
  {
    id: '6020610d-0e18-4a09-8e24-b0deca79bb19',
    'base_price': 99,
    'date_from': '2026-10-25T08:18:06.011Z',
    'date_to': '2026-10-25T19:46:06.011Z',
    'destination': getRandomArrayElement(mockDestinations).id,
    'is_favorite': true,
    'offers': [
      '718ad9f2-a5c7-482a-b31e-4998a1455bce'
    ],
    'type': 'train',
  },
];

function getRandomPoint() {
  return getRandomArrayElement(mockEvents);
}

export { getRandomPoint, mockEvents };
