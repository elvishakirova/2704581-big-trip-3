import { getRandomInteger } from '../utils.js';
const RandomImages = {
  MIN: 1,
  MAX: 100,
};

const mockDestinations = [
  {
    id: 'destination-2',
    description:
      'Santiago de Chile is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Santiago de Chile',
    pictures: [
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Santiago de Chile parliament building',
      },
    ],
  },
  {
    id: 'destination-2',
    description:
      'Buenos Aires is the capital of Argentina, famous for its colorful neighborhoods, tango music, and historic architecture.',
    name: 'Buenos Aires',
    pictures: [
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Colorful streets of Buenos Aires',
      },
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Historic buildings in Buenos Aires',
      },
    ],
  },
  {
    id: 'destination-3',
    description:
      'Tokyo is a vibrant city in Japan, known for its modern skyscrapers, traditional temples, and lively shopping districts.',
    name: 'Tokyo',
    pictures: [
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Tokyo skyline',
      },
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Traditional temple in Tokyo',
      },
    ],
  },
  {
    id: 'destination-4',
    description:
      'Paris is the capital of France, celebrated for its museums, beautiful boulevards, charming cafes, and famous landmarks.',
    name: 'Paris',
    pictures: [
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Eiffel Tower in Paris',
      },
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Parisian street with cafes',
      },
    ],
  },
  {
    id: 'destination-5',
    description:
      'Rome is a historic Italian city filled with ancient monuments, impressive churches, picturesque squares, and traditional restaurants.',
    name: 'Rome',
    pictures: [
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Colosseum in Rome',
      },
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Historic square in Rome',
      },
    ],
  },
  {
    id: 'destination-6',
    description:
      'Amsterdam is a charming city in the Netherlands, famous for its canals, narrow houses, bicycles, and world-class museums.',
    name: 'Amsterdam',
    pictures: [
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Amsterdam canal houses',
      },
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Bicycles along an Amsterdam canal',
      },
    ],
  },
  {
    id: 'destination-7',
    description:
      'Barcelona is a coastal city in Spain, known for its unique architecture, Mediterranean beaches, lively markets, and artistic heritage.',
    name: 'Barcelona',
    pictures: [
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Sagrada Familia in Barcelona',
      },
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Barcelona waterfront',
      },
    ],
  },
  {
    id: 'destination-8',
    description:
      'Reykjavik is the capital of Iceland, surrounded by dramatic landscapes, volcanic mountains, geothermal springs, and the North Atlantic Ocean.',
    name: 'Reykjavik',
    pictures: [
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Colorful houses in Reykjavik',
      },
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Hallgrimskirkja church in Reykjavik',
      },
    ],
  },
  {
    id: 'destination-9',
    description:
      'Sydney is a major Australian city, famous for its iconic Opera House, beautiful harbor, sandy beaches, and sunny coastal lifestyle.',
    name: 'Sydney',
    pictures: [
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Sydney Opera House',
      },
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Sydney Harbour Bridge',
      },
    ],
  },
  {
    id: 'destination-10',
    description:
      'Kyoto is a historic Japanese city, renowned for its peaceful gardens, traditional wooden houses, ancient shrines, and beautiful temples.',
    name: 'Kyoto',
    pictures: [
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Traditional streets of Kyoto',
      },
      {
        src: `https://picsum.photos/seed/${getRandomInteger(RandomImages.MIN, RandomImages.MAX)}/248/152`,
        description: 'Fushimi Inari shrine in Kyoto',
      },
    ],
  },
];

export { mockDestinations };
