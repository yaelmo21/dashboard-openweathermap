'use server';

import { ApiOpenWeatherMap } from '@/apis';
import { WeatherResponse } from '@/interfaces';

interface Props {
  location: {
    latitude: number;
    longitude: number;
  };
  unit?: string;
}

export default async function fetchWeather({ location, unit }: Props) {
  const response = await ApiOpenWeatherMap.get<WeatherResponse>('/weather', {
    params: {
      lat: location.latitude,
      lon: location.longitude,
      units: unit,
    },
  });
  return response.data;
}
