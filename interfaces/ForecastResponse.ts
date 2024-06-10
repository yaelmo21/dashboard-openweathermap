import { Clouds, Coord, Sys, Weather, Wind } from './WeatherResponse';

export interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface List {
  dt: number;
  main: MainClass;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain?: Rain;
  sys: Sys;
  dt_txt: Date;
}

export interface MainClass {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface Rain {
  '3h': number;
}

export enum Pod {
  D = 'd',
  N = 'n',
}

export enum Description {
  LluviaLigera = 'lluvia ligera',
  LluviaModerada = 'lluvia moderada',
  MuyNuboso = 'muy nuboso',
  Nubes = 'nubes',
  NubesDispersas = 'nubes dispersas',
}

export enum Icon {
  The03D = '03d',
  The04D = '04d',
  The04N = '04n',
  The10D = '10d',
  The10N = '10n',
}

export enum MainEnum {
  Clouds = 'Clouds',
  Rain = 'Rain',
}
