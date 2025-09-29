import { Route, Bus, Stop, LanguageOption } from '@/types';

export const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
];

export const stops: Stop[] = [
  { id: 'stop1', name: 'Central Bus Station', coordinates: [26.1445, 91.7362] },
  { id: 'stop2', name: 'Railway Station', coordinates: [26.1812, 91.7479] },
  { id: 'stop3', name: 'GS Road Junction', coordinates: [26.1558, 91.7496] },
  { id: 'stop4', name: 'Fancy Bazaar', coordinates: [26.1750, 91.7514] },
  { id: 'stop5', name: 'Pan Bazaar', coordinates: [26.1833, 91.7540] },
  { id: 'stop6', name: 'Paltan Bazaar', coordinates: [26.1722, 91.7587] },
  { id: 'stop7', name: 'Zoo Road', coordinates: [26.1667, 91.7654] },
  { id: 'stop8', name: 'Cotton University', coordinates: [26.1478, 91.7890] },
];

export const routes: Route[] = [
  {
    id: 'route-a',
    name: 'Route A',
    color: '#E91E63',
    coordinates: [
      [26.1445, 91.7362],
      [26.1558, 91.7496],
      [26.1750, 91.7514],
      [26.1833, 91.7540],
      [26.1722, 91.7587],
    ],
    stops: stops.slice(0, 5),
  },
  {
    id: 'route-b',
    name: 'Route B',
    color: '#2196F3',
    coordinates: [
      [26.1812, 91.7479],
      [26.1667, 91.7654],
      [26.1478, 91.7890],
      [26.1558, 91.7496],
    ],
    stops: [stops[1], stops[6], stops[7], stops[2]],
  },
];

export const buses: Bus[] = [
  {
    id: 'bus-101',
    number: 'BUS-101',
    routeId: 'route-a',
    status: 'Moving',
    speed: 24.0,
    etaToNextStop: 1.1,
    crowdLevel: 'available',
    currentPosition: [26.1500, 91.7450],
  },
  {
    id: 'bus-102',
    number: 'BUS-102',
    routeId: 'route-a',
    status: 'Moving',
    speed: 23.6,
    etaToNextStop: 0.6,
    crowdLevel: 'standing',
    currentPosition: [26.1680, 91.7530],
  },
  {
    id: 'bus-201',
    number: 'BUS-201',
    routeId: 'route-b',
    status: 'Moving',
    speed: 40.3,
    etaToNextStop: 0.5,
    crowdLevel: 'full',
    currentPosition: [26.1750, 91.7600],
  },
  {
    id: 'bus-202',
    number: 'BUS-202',
    routeId: 'route-b',
    status: 'Moving',
    speed: 25.9,
    etaToNextStop: 4.0,
    crowdLevel: 'available',
    currentPosition: [26.1600, 91.7700],
  },
];

export const fareMatrix = {
  'stop1-stop2': 15,
  'stop1-stop3': 20,
  'stop2-stop3': 12,
  'stop3-stop4': 18,
  'stop4-stop5': 15,
  'stop5-stop6': 20,
  // Add more fare combinations as needed
};