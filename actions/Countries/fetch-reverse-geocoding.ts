'use server';

import { ApiGeo } from '@/apis';
import { ReverseGeocodingResponse } from '@/interfaces';

interface Props {
  location: {
    latitude: number;
    longitude: number;
  };
}

export default async function fetchReverseGeocoding({ location }: Props) {
  const response = await ApiGeo.get<ReverseGeocodingResponse[]>('/reverse', {
    params: {
      lat: location.latitude,
      lon: location.longitude,
    },
  });
  return response.data;
}
