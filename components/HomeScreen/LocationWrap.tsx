'use client';
import { XCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Country } from 'country-state-city';
import React, { FC, useEffect, useState } from 'react';
import CurrentWeather from './CurrentWeather';
import { QueryParams } from '@/interfaces';
import Filters from './Filters';
import Forecast from './Forecast';
import ForecastHours from './ForecastHours';

interface LocationWrapProps {
  query: QueryParams;
}

const LocationWrap: FC<LocationWrapProps> = ({ query }) => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [error, setError] = useState<string>();

  const handleLocation = () => {
    if (query.latitude && query.longitude) {
      setLocation({
        latitude: query.latitude,
        longitude: query.longitude,
      });
      return;
    }
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          setError(error.message);
          const mexico = Country.getCountryByCode('MX');
          setLocation({
            latitude: Number(mexico?.latitude) || 0,
            longitude: Number(mexico?.longitude) || 0,
          });
        },
      );
    } else {
      setError('Geolocation is not available');
      const mexico = Country.getCountryByCode('MX');
      setLocation({
        latitude: Number(mexico?.latitude) || 23.6345,
        longitude: Number(mexico?.longitude) || -102.5528,
      });
    }
  };

  const handleQuery = () => {
    const { latitude, longitude } = query;
    if (latitude && longitude) {
      setLocation({ latitude, longitude });
    }
  };

  useEffect(() => {
    handleLocation();
  }, []);

  useEffect(() => {
    handleQuery();
  }, [query]);

  return (
    <div className='flex flex-col space-y-4'>
      {error && (
        <div className='rounded-md bg-red-50 p-4'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <XCircleIcon
                className='h-5 w-5 text-red-400'
                aria-hidden='true'
              />
            </div>
            <div className='ml-3 flex-1'>
              <h3 className='text-sm font-medium text-red-800'>
                Ocurrio un error
              </h3>
              <div className='mt-2 text-sm text-red-700'>
                <p>{error}</p>
              </div>
              <div className='mt-4 flex space-x-2 justify-center'>
                <button
                  type='button'
                  className='text-red-400 hover:text-red-500 bg-red-100 px-2 py-1 rounded-md'
                  onClick={handleLocation}
                >
                  reintentar
                </button>
              </div>
            </div>
            <div>
              <button
                type='button'
                className='text-red-400 hover:text-red-500'
                onClick={() => setError('')}
              >
                <span className='sr-only'>Cerrar</span>
                <XMarkIcon className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>
          </div>
        </div>
      )}
      <Filters
        query={{
          ...query,
          latitude: location?.latitude,
          longitude: location?.longitude,
        }}
      />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        <div className='col-span-1 sm:col-span-2'>
          <CurrentWeather location={location!} unit={query.unit} />
        </div>
        <div className='col-span-1 sm:col-span-3'>
          <ForecastHours location={location!} unit={query.unit} />
        </div>
        <div className='col-span-1 sm:col-span-5'>
          <Forecast location={location!} unit={query.unit} />
        </div>
      </div>
    </div>
  );
};

export default LocationWrap;
