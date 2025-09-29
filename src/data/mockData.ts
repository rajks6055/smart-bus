import { Route, Bus, Stop, LanguageOption } from '@/types';

export const languages: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
];

export const stops: Stop[] = [
  { id: 'stop1', name: 'Chandigarh Bus Stand', coordinates: [30.7333, 76.7794] },
  { id: 'stop2', name: 'Amritsar Railway Station', coordinates: [31.6340, 74.8723] },
  { id: 'stop3', name: 'Ludhiana Central', coordinates: [30.9010, 75.8573] },
  { id: 'stop4', name: 'Patiala Bus Stand', coordinates: [30.3398, 76.3869] },
  { id: 'stop5', name: 'Jalandhar City', coordinates: [31.3260, 75.5762] },
  { id: 'stop6', name: 'Bathinda Junction', coordinates: [30.2110, 74.9455] },
  { id: 'stop7', name: 'Mohali Phase 7', coordinates: [30.7046, 76.7179] },
  { id: 'stop8', name: 'Pathankot Cantt', coordinates: [32.2733, 75.6523] },
];

export const routes: Route[] = [
  {
    id: 'route-a',
    name: 'Chandigarh - Ludhiana Express',
    color: '#E91E63',
    coordinates: [
      [30.7333, 76.7794], // Chandigarh
      [30.7046, 76.7179], // Mohali
      [30.3398, 76.3869], // Patiala
      [30.9010, 75.8573], // Ludhiana
      [31.3260, 75.5762], // Jalandhar
    ],
    stops: [stops[0], stops[6], stops[3], stops[2], stops[4]],
  },
  {
    id: 'route-b',
    name: 'Amritsar - Bathinda Line',
    color: '#2196F3',
    coordinates: [
      [31.6340, 74.8723], // Amritsar
      [32.2733, 75.6523], // Pathankot
      [31.3260, 75.5762], // Jalandhar
      [30.2110, 74.9455], // Bathinda
    ],
    stops: [stops[1], stops[7], stops[4], stops[5]],
  },
];

export const buses: Bus[] = [
  {
    id: 'bus-101',
    number: 'PB-01-101',
    routeId: 'route-a',
    status: 'Moving',
    speed: 45.0,
    etaToNextStop: 3.2,
    crowdLevel: 'available',
    currentPosition: [30.7200, 76.7500],
  },
  {
    id: 'bus-102',
    number: 'PB-01-102',
    routeId: 'route-a',
    status: 'Moving',
    speed: 42.5,
    etaToNextStop: 1.8,
    crowdLevel: 'standing',
    currentPosition: [30.5500, 76.5000],
  },
  {
    id: 'bus-201',
    number: 'PB-02-201',
    routeId: 'route-b',
    status: 'Moving',
    speed: 38.0,
    etaToNextStop: 2.5,
    crowdLevel: 'full',
    currentPosition: [31.4000, 74.9000],
  },
  {
    id: 'bus-202',
    number: 'PB-02-202',
    routeId: 'route-b',
    status: 'Moving',
    speed: 35.5,
    etaToNextStop: 4.1,
    crowdLevel: 'available',
    currentPosition: [31.8000, 75.2000],
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