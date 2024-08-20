import { http, HttpResponse } from 'msw';

export const mockResponse = {
  count: 1,
  next: null,
  previous: null,
  results: [
    {
      id: '1',
      name: 'test',
      climate: 'arid',
      created: '2024-07-26',
      diameter: '10465',
      edited: '2024-07-26',
      gravity: '1 standard',
      orbital_period: '304',
      population: '200000',
      rotation_period: '23',
      surface_water: '1',
      terrain: 'desert',
      residents: [],
      films: [],
      url: '',
    },
  ],
};

export const mockPlanet = {
  id: '1',
  name: 'Tatooine',
  climate: 'arid',
  created: '2024-07-26',
  diameter: '10465',
  edited: '2024-07-26',
  gravity: '1 standard',
  orbital_period: '304',
  population: '200000',
  rotation_period: '23',
  surface_water: '1',
  terrain: 'desert',
};

const handlers = [
  http.get('https://swapi.dev/api/planets', () => HttpResponse.json(mockResponse)),

  http.get('https://swapi.dev/api/planets/:id', () => HttpResponse.json(mockPlanet)),
];

export default handlers;
