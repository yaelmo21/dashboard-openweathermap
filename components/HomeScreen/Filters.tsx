'use client';
import { FaFilter } from 'react-icons/fa';
import React, { FC, useEffect } from 'react';
import { Select } from '../ui';
import { useFormik } from 'formik';
import { QueryParams } from '@/interfaces';
import queryString from 'query-string';
import { usePathname, useRouter } from 'next/navigation';

const units = [
  {
    value: 'imperial',
    label: 'Fahrenheit',
  },
  {
    value: 'metric',
    label: 'Celsius',
  },
  {
    value: 'standard',
    label: 'Kelvin',
  },
];

interface FiltersProps {
  query: QueryParams;
}
const Filters: FC<FiltersProps> = ({ query }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { handleSubmit, values, setFieldValue } = useFormik({
    initialValues: {
      unit: units[2],
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const queryParams = queryString.stringify(
        { unit: values.unit.value },
        { skipEmptyString: true },
      );
      router.push(`${pathname}?${queryParams}`);
    },
  });

  const handleChekQuery = () => {
    const { unit } = query;
    if (!unit) return;
    const selectedUnit = units.find((item) => item.value === unit);
    if (selectedUnit) {
      setFieldValue('unit', selectedUnit);
    }
  };

  useEffect(() => {
    handleChekQuery();
  }, [query]);

  return (
    <div className='bg-indigo-600 p-3 rounded-lg'>
      <div className='flex items-center justify-center bg-indigo-700 p-3 rounded-lg gap-2'>
        <div>
          <FaFilter className='text-white text-2xl mx-auto' />
        </div>
        <h2 className='text-white text-lg font-semibold'>
          Filtros de busqueda
        </h2>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
          <Select
            label='Unidades'
            options={units}
            value={values.unit}
            onChange={(unit) => setFieldValue('unit', unit)}
            classNameLabel='text-white'
          />
        </div>
        <div className='flex justify-center'>
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
