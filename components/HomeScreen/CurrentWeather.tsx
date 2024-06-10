import React, { FC, useEffect, useState, useTransition } from 'react';
import { TiWeatherCloudy } from 'react-icons/ti';
import { fetchWeather } from '@/actions/WeatherMap';
import { Loading } from '../ui';
import { WeatherResponse } from '@/interfaces';
import { UnitSmall } from '@/shared';

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
          const selectedUnit = UnitSmall.find((item) => item.value === unit);
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
      <div className='w-full h-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-center justify-center'>
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full h-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 min-h-full'>
        <span className='text-red-700' data-testid='error'>
          {error}
        </span>
      </div>
    );
  }

  return (
    <div className='w-full h-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex flex-col justify-between'>
      <h3
        className='text-lg font-semibold text-gray-800 dark:text-white text-center'
        data-testid='location'
      >
        <span className='text-gray-800 dark:text-white'>Clima en </span>
      </h3>
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
        <p
          className='text-gray-800 dark:text-white text-center flex justify-center gap-2'
          data-testid='weather-info'
        >
          <small>
            <span className='text-gray-800 dark:text-white'>Min:</span>{' '}
            {data?.main.temp_min}° {currentUnit}
          </small>
          <small>
            <span className='text-gray-800 dark:text-white'>Max:</span>{' '}
            {data?.main.temp_max}° {currentUnit}
          </small>
        </p>
        <p className='text-gray-800 dark:text-white text-center capitalize'>
          {data?.weather[0].description}
        </p>
      </div>
    </div>
  );
};

export default CurrentWeather;
