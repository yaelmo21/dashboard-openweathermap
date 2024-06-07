'use client';
import { FaFilter } from 'react-icons/fa';
import React from 'react';
import { Select } from '../ui';
import { useFormik } from 'formik';

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

const Filters = () => {
  const { handleSubmit, values, setFieldValue } = useFormik({
    initialValues: {
      unit: units[2],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
      <form
        onSubmit={handleSubmit}
        className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'
      >
        <Select
          label='Unidades'
          options={units}
          value={values.unit}
          onChange={(unit) => setFieldValue('unit', unit)}
          classNameLabel='text-white'
        />
      </form>
    </div>
  );
};

export default Filters;
