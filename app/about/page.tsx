import React from 'react';

const pages = () => {
  return (
    <div className='pt-16 mx-auto max-w-7xl sm:px-6 lg:px-8 flex flex-col gap-2'>
      <h1
        className='text-2xl font-semibold text-gray-800 dark:text-white'
        data-testid='title'
      >
        Acerca de la aplicación
      </h1>

      <p
        className='text-lg text-gray-600 dark:text-gray-300'
        data-testid='description'
      >
        Esta aplicación fue creada con el propósito de mostrar el clima de una
        ciudad en tiempo real. Utiliza la API de OpenWeather para obtener los
        datos climáticos. La aplicación fue creada con Next.js y Tailwind CSS.
      </p>

      <p
        className='text-lg text-gray-600 dark:text-gray-300'
        data-testid='source-code'
      >
        Puedes encontrar el código fuente de la aplicación en el siguiente
        enlace:
        <a
          href='https://github.com/yaelmo21/dashboard-openweathermap'
          target='_blank'
          rel='noreferrer'
          className='ml-2 text-blue-500 dark:text-blue-300'
        >
          Github
        </a>
      </p>

      <small>
        <p className='text-gray-500 dark:text-gray-400'>
          Hecho con ❤️ por{' '}
          <a
            href='https://yaelruiz.com'
            target='_blank'
            rel='noreferrer'
            className='text-blue-500 dark:text-blue-300'
          >
            Yaelmo
          </a>
        </p>
      </small>
    </div>
  );
};

export default pages;
