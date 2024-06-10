'use server';

import { ApiOpenWeatherMap } from '@/apis';
import { ForecastResponse } from '@/interfaces';
import moment from 'moment';

interface Props {
  date: Date;
  location: {
    latitude: number;
    longitude: number;
  };
  unit?: string;
}

export default async function fetchForecastHours({
  location,
  unit,
  date,
}: Props) {
  const { data } = await ApiOpenWeatherMap.get<ForecastResponse>('/forecast', {
    params: {
      lat: location.latitude,
      lon: location.longitude,
      units: unit,
    },
  });

  const list = data.list.filter((item) => {
    const currentDate = moment(item.dt_txt)
      .set({
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0,
      })
      .toDate();
    return moment(currentDate).isSame(date, 'day');
  });

  console.log(list.length);

  return list;
}
