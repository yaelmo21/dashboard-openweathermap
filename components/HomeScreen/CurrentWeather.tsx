import React, { FC, useEffect, useState, useTransition } from 'react';
import { TiWeatherCloudy } from 'react-icons/ti';
import { fetchWeather } from '@/actions/WeatherMap';
import { Loading } from '../ui';
import { WeatherResponse } from '@/interfaces';

const units = [
  {
    value: 'imperial',
    label: 'F',
  },
  {
    value: 'metric',
    label: 'C',
  },
  {
    value: 'standard',
    label: 'K',
  },
];

interface CurrentWeatherProps {
  location: {
    latitude: number;
    longitude: number;
  };
  unit?: string;
}

const CurrentWeather: FC<CurrentWeatherProps> = ({ location, unit }) => {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<WeatherResponse>();
  const [currentUnit, setCurrentUnit] = useState('K');
  const [error, setError] = useState<string>();
  const handleFetchWeather = () => {
    if (!location) return;
    startTransition(async () => {
      try {
        const data = await fetchWeather({ location, unit });
        setData(data);
        if (unit) {
          const selectedUnit = units.find((item) => item.value === unit);
          if (selectedUnit) {
            setCurrentUnit(selectedUnit.label);
          }
        }
      } catch (error) {
        setError('Error fetching weather data');
      }
    });
  };

  useEffect(() => {
    handleFetchWeather();
  }, [location, unit]);

  if (isPending || !data) {
    return (
      <div className='w-fullbg-white dark:bg-gray-800 shadow-lg rounded-lg p-4'>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-fullbg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 min-h-full'>
        <span className='text-red-700' data-testid='error'>
          {error}
        </span>
      </div>
    );
  }

  return (
    <div className='w-fullbg-white dark:bg-gray-800 shadow-lg rounded-lg p-4'>
      <h2 className='text-xl font-semibold text-gray-800 dark:text-white text-center'>
        {data?.name}
      </h2>
      <div>
        <TiWeatherCloudy className='h-40 w-40 text-gray-800 dark:text-white mx-auto' />
      </div>
      <div>
        <h3 className='text-3xl font-semibold text-gray-800 dark:text-white text-center'>
          {data?.main.temp}°
          <span className='text-2xl font-normal ml-1'>{currentUnit}</span>
        </h3>
        <p className='text-gray-800 dark:text-white text-center capitalize'>
          {data?.weather[0].description}
        </p>
      </div>
    </div>
  );
};

export default CurrentWeather;
