'use client';
import { XCircleIcon } from '@heroicons/react/24/outline';
import React, { Suspense, useEffect, useState } from 'react';
import CurrentWeather from './CurrentWeather';

const LocationWrap = () => {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>();
  const [error, setError] = useState<string>();

  useEffect(() => {
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
        },
      );
    } else {
      setError('Geolocation is not supported by your browser');
    }
  }, []);

  if (error) {
    return (
      <div className='flex flex-col space-y-4'>
        <div className='rounded-md bg-red-50 p-4'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <XCircleIcon
                className='h-5 w-5 text-red-400'
                aria-hidden='true'
              />
            </div>
            <div className='ml-3'>
              <h3 className='text-sm font-medium text-red-800'>
                Ocurrio un error
              </h3>
              <div className='mt-2 text-sm text-red-700'>
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col space-y-4'>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        <div className='col-span-1 sm:col-span-2'>
          <CurrentWeather location={location!} />
        </div>
      </div>
    </div>
  );
};

export default LocationWrap;
