'use server';

import { ApiOpenWeatherMap } from '@/apis';
import { ForecastResponse } from '@/interfaces';
import moment from 'moment';

interface Props {
  location: {
    latitude: number;
    longitude: number;
  };
  unit?: string;
}

export default async function fetchForecastDaily({ location, unit }: Props) {
  const { data } = await ApiOpenWeatherMap.get<ForecastResponse>('/forecast', {
    params: {
      lat: location.latitude,
      lon: location.longitude,
      units: unit,
    },
  });

  data.list = data.list.map((item) => {
    item.dt_txt = moment(item.dt_txt)
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .toDate();
    return item;
  });

  const dates = [...new Set(data.list.map((item) => item.dt_txt.getTime()))];

  const list = dates.map((date) => {
    return data.list.filter((item) => item.dt_txt.getTime() === date)[0];
  });
  data.list = list;
  return {
    dates,
    data,
  };
}
