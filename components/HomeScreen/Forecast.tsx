'use client';
import React, { FC, useEffect, useState, useTransition } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { fetchForecastDaily } from '@/actions/WeatherMap';
import { Line } from 'react-chartjs-2';
import { Loading } from '../ui';
import { ForecastResponse } from '@/interfaces';
import moment from 'moment';
import 'moment/locale/es-mx';
import { useDarkMode } from '@/hooks';
import { UnitSmall } from '@/shared';

interface ForecastProps {
  location: {
    latitude: number;
    longitude: number;
  };
  unit?: string;
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Forecast: FC<ForecastProps> = ({ location, unit }) => {
  const isDarkMode = useDarkMode();
  const unitValue = UnitSmall.find((item) => item.value === unit)?.label || '';
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: ${value} ${unitValue}`; // Agrega la unidad "units" a los tooltips
          },
        },
      },
      title: {
        display: true,
        text: 'Pronóstico del clima 5 días',
        color: isDarkMode ? 'white' : 'black',
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDarkMode ? 'white' : 'black',
        },
      },
      y: {
        ticks: {
          color: isDarkMode ? 'white' : 'black',
          callback: (value: number | string) => `${value} ${unitValue}`,
        },
      },
    },
  };
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState<{
    dates: number[];
    data: ForecastResponse;
  }>();
  const labels =
    content?.dates.map((date) => moment(date).format('dddd DD MMM')) || [];

  const handleFetchForecast = () => {
    if (!location) return;
    startTransition(async () => {
      try {
        const data = await fetchForecastDaily({ location, unit });
        setContent(data);
      } catch (error) {
        setError('Error fetching forecast data');
      }
    });
  };

  useEffect(() => {
    handleFetchForecast();
  }, [location, unit]);

  const dataChart = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: content?.data.list.map((item) => item.main.temp) || [],
        borderColor: 'rgba(55,48,163, 1)',
        backgroundColor: 'rgba(55,48,16, 0.5)',
        color: 'rgba(55,48,163, 1)',
      },
    ],
  };

  if (error) {
    return (
      <div className='w-full h-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 min-h-full text-center flex flex-col justify-center'>
        <span className='text-red-700' data-testid='error'>
          {error}
        </span>
      </div>
    );
  }

  if ((isPending || !content) && !error) {
    return (
      <div className='w-full h-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-center justify-center'>
        <Loading data-testid='loading' />
      </div>
    );
  }

  return (
    <div className='w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 '>
      <Line options={options} data={dataChart} className='text-white' />
    </div>
  );
};

export default Forecast;
