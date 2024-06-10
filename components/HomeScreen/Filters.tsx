'use client';
import { FaFilter } from 'react-icons/fa';
import { Country } from 'country-state-city';
import React, { FC, useEffect, useState, useTransition } from 'react';
import { Select } from '../ui';
import { useFormik } from 'formik';
import { QueryParams } from '@/interfaces';
import queryString from 'query-string';
import { usePathname, useRouter } from 'next/navigation';
import { fetchReverseGeocoding } from '@/actions/Countries';
import { Countries, getStateByName, getStatesOfCountry, Units } from '@/shared';
import { getCitiesOfState, getCityByName } from '@/shared/StateCities';

interface FormValues {
  unit: {
    label: string;
    value: string;
  };
  country: {
    label: string;
    value: string;
  } | null;
  state: {
    label: string;
    value: string;
  } | null;
  city: {
    label: string;
    value: string;
  } | null;
}

interface FiltersProps {
  query: QueryParams;
}
const Filters: FC<FiltersProps> = ({ query }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [errorCoords, setErrorCoords] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [initData, setInitData] = useState<FormValues>({
    unit: Units[2],
    country: null,
    state: null,
    city: null,
  });
  const [countryStates, setCountryStates] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const [stateCities, setStateCities] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);
  const { handleSubmit, values, setFieldValue } = useFormik<FormValues>({
    initialValues: initData,
    enableReinitialize: true,
    onSubmit: (values) => {
      let coords: {
        latitude: string | undefined | null;
        longitude: string | undefined | null;
      } = {
        latitude: undefined,
        longitude: undefined,
      };
      if (values.country && values.state && values.city) {
        const city = getCityByName(
          values.country.value,
          values.state.value,
          values.city.label,
        );
        coords = {
          latitude: city?.latitude,
          longitude: city?.longitude,
        };
      }

      if (values.country && values.state && !values.city) {
        const state = getStateByName(values.country.value, values.state.label);
        coords = {
          latitude: state?.latitude,
          longitude: state?.longitude,
        };
      }

      if (values.country && !values.state && !values.city) {
        const country = Country.getCountryByCode(values.country.value);
        coords = {
          latitude: country?.latitude,
          longitude: country?.longitude,
        };
      }

      const queryParams = queryString.stringify(
        {
          unit: values.unit.value,
          ...coords,
        },
        { skipEmptyString: true },
      );
      router.push(`${pathname}?${queryParams}`);
    },
  });

  const handleChekQuery = () => {
    const { unit, longitude, latitude } = query;
    if (unit) {
      const selectedUnit = Units.find((item) => item.value === unit);
      if (selectedUnit) {
        setFieldValue('unit', selectedUnit);
      }
    }
    if (longitude && latitude) {
      startTransition(async () => {
        setErrorCoords(undefined);
        try {
          const data = await fetchReverseGeocoding({
            location: { latitude, longitude },
          });
          if (data.length === 0) {
            setErrorCoords('No se pudo obtener la ubicación');
            return;
          }
          const { country, name, state } = data[0];
          const currentCountry = Country.getCountryByCode(country);
          if (!currentCountry) return;
          if (!state) {
            setInitData({
              unit: Units[2],
              country: {
                label: currentCountry.name,
                value: currentCountry.isoCode,
              },
              state: null,
              city: null,
            });
            return;
          }
          const currentState = getStateByName(currentCountry.isoCode, state);
          if (!currentState) {
            setInitData({
              unit: Units[2],
              country: {
                label: currentCountry.name,
                value: currentCountry.isoCode,
              },
              state: null,
              city: null,
            });
            return;
          }
          const currentCity = getCityByName(
            currentCountry.isoCode,
            currentState.isoCode,
            name,
          );
          if (!currentCity) return;
          setInitData({
            unit: Units[2],
            country: {
              label: currentCountry.name,
              value: currentCountry.isoCode,
            },
            state: {
              label: currentState.name,
              value: currentState.isoCode,
            },
            city: {
              label: currentCity.name,
              value: currentCity.name,
            },
          });
        } catch (error) {
          console.log(error);
          setErrorCoords('No se pudo obtener la ubicación');
        }
      });
    }
  };

  useEffect(() => {
    handleChekQuery();
  }, [query]);

  useEffect(() => {
    if (!values.country) return;
    if (values.country.value !== initData.country?.value) {
      setFieldValue('state', null);
      setFieldValue('city', null);
    }
    const states = getStatesOfCountry(values.country.value);
    setCountryStates(states);
  }, [values.country]);

  useEffect(() => {
    if (!values.state || !values.country) return;
    const cities = getCitiesOfState(values.country.value, values.state.value);
    setStateCities(cities);
  }, [values.state, values.country]);

  return (
    <div className='bg-indigo-600 p-3 rounded-lg flex flex-col gap-5'>
      <div className='flex items-center justify-center bg-indigo-700 p-3 rounded-lg gap-2'>
        <div>
          <FaFilter className='text-white text-2xl mx-auto' />
        </div>
        <h2 className='text-white text-lg font-semibold'>
          Filtros de busqueda
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4'>
          <Select
            label='Unidades'
            options={Units}
            value={values.unit}
            onChange={(unit) => setFieldValue('unit', unit)}
            classNameLabel='text-white'
          />
          <Select
            label='País'
            options={Countries}
            value={values.country}
            onChange={(country) => setFieldValue('country', country)}
            classNameLabel='text-white'
            disabled={Countries.length === 0 || isPending}
          />
          <Select
            label='Estado'
            options={countryStates}
            value={values.state}
            onChange={(state) => setFieldValue('state', state)}
            classNameLabel='text-white'
            disabled={countryStates.length === 0 || isPending}
          />
          <Select
            label='Ciudad'
            options={stateCities}
            value={values.city}
            onChange={(city) => setFieldValue('city', city)}
            classNameLabel='text-white'
            disabled={stateCities.length === 0 || isPending}
          />
        </div>
        {errorCoords && (
          <div className='text-red-500 text-sm font-semibold mt-2 bg-red-100 p-2 rounded-lg text-center'>
            {errorCoords}
          </div>
        )}
        <div className='flex justify-center mt-4'>
          <button
            type='submit'
            className='rounded bg-indigo-900 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Aplicar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Filters;
