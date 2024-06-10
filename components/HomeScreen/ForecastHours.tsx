'use client';
import React, { FC, useEffect, useState, useTransition } from 'react';
import { useDarkMode } from '@/hooks';
import { ForecastResponse, List } from '@/interfaces';
import { Loading } from '../ui';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import fetchForecastHours from '@/actions/WeatherMap/fetch-forecast-hours';
import moment from 'moment';
import { UnitSmall } from '@/shared';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
);

interface ForecastHoursProps {
  location: {
    latitude: number;
    longitude: number;
  };
  unit?: string;
}

const ForecastHours: FC<ForecastHoursProps> = ({ location, unit }) => {
  const isDarkMode = useDarkMode();
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState<List[]>();
  const unitValue = UnitSmall.find((item) => item.value === unit)?.label || '';

  const options: ChartOptions<'line'> = {
    responsive: true,

    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: ${value} ${unitValue}`; // Agrega la unidad "units" a los tooltips
          },
        },
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: `Pronóstico del clima ${moment().add(1, 'd').format('LL')}`,
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

  const data = {
    labels: content?.map(
      (item) => moment(item.dt_txt).format('HH:mm') + ' hrs',
    ),
    datasets: [
      {
        fill: true,
        label: 'Temperatura',
        data: content?.map((item) => item.main.temp),
        borderColor: 'rgba(55,48,163, 1)',
        backgroundColor: 'rgba(55,48,163, 0.5)',
      },
    ],
  };

  const handleFetchForecast = () => {
    if (!location) return;
    startTransition(async () => {
      try {
        const data = await fetchForecastHours({
          location,
          unit,
          date: moment().add(1, 'd').toDate(),
        });
        setContent(data);
      } catch (error) {
        setError('Error fetching forecast data');
      }
    });
  };

  useEffect(() => {
    handleFetchForecast();
  }, [location, unit]);

  if (error) {
    return (
      <div className='w-full h-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 min-h-full text-center flex flex-col justify-center'>
        <span className='text-red-700' data-testid='error'>
          {error}
        </span>
      </div>
    );
  }

  if (isPending || !content) {
    return (
      <div className='w-full h-full  bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 flex items-center justify-center'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='w-full h-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 '>
      <Line options={options} data={data} />
    </div>
  );
};

export default ForecastHours;
