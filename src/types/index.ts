export interface Route {
  id: string;
  name: string;
  color: string;
  coordinates: [number, number][];
  stops: Stop[];
}

export interface Stop {
  id: string;
  name: string;
  coordinates: [number, number];
}

export interface Bus {
  id: string;
  number: string;
  routeId: string;
  status: 'Moving' | 'Stopped' | 'Maintenance';
  speed: number;
  etaToNextStop: number;
  crowdLevel: 'available' | 'standing' | 'full';
  currentPosition: [number, number];
}

export interface JourneyResult {
  busNumbers: string[];
  eta: number;
  totalTime: number;
  fare: number;
  route: Route;
}

export type Language = 'en' | 'hi' | 'as' | 'bn';

export interface LanguageOption {
  code: Language;
  name: string;
  nativeName: string;
}