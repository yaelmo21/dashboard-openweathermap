import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import ForecastHours from '@/components/HomeScreen/ForecastHours';
import fetchForecastHours from '@/actions/WeatherMap/fetch-forecast-hours';

// Mock para fetchForecastHours
jest.mock('../../../actions/WeatherMap/fetch-forecast-hours');

describe('ForecastHours component', () => {
  beforeEach(() => {
    // Resetear el mock de fetchForecastHours antes de cada prueba
    fetchForecastHours.mockReset();
  });

  it('renders loading state initially', async () => {
    // Configurar el mock de fetchForecastHours para devolver una promesa pendiente
    fetchForecastHours.mockResolvedValueOnce(new Promise(() => {}));

    render(<ForecastHours location={{ latitude: 0, longitude: 0 }} />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders error state if forecast data fetch fails', async () => {
    // Configurar el mock de fetchForecastHours para devolver un error
    fetchForecastHours.mockRejectedValueOnce(
      new Error('Failed to fetch forecast'),
    );

    render(<ForecastHours location={{ latitude: 0, longitude: 0 }} />);

    // Esperar a que se muestre el mensaje de error
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });

  it('renders forecast data when fetched successfully', async () => {
    const mockForecastData = [
      { dt_txt: '2024-06-11 12:00:00', main: { temp: 20 } },
      { dt_txt: '2024-06-11 15:00:00', main: { temp: 22 } },
      { dt_txt: '2024-06-11 18:00:00', main: { temp: 18 } },
    ];

    // Configurar el mock de fetchForecastHours para devolver datos de pronóstico
    fetchForecastHours.mockResolvedValueOnce(mockForecastData);

    render(<ForecastHours location={{ latitude: 0, longitude: 0 }} />);

    // Esperar a que se renderice el componente con los datos de pronóstico
    await waitFor(() => {
      const canvasElement = screen.getByTestId('forecast-canvas');
      expect(canvasElement).toBeInTheDocument();
    });
  });
});
