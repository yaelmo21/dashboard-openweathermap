import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { fetchForecastDaily } from '@/actions/WeatherMap';
import Forecast from '@/components/HomeScreen/Forecast';

// Mock para fetchForecastDaily
jest.mock('../../../actions/WeatherMap');

describe('Forecast component', () => {
  beforeEach(() => {
    // Resetear el mock de fetchForecastDaily antes de cada prueba
    fetchForecastDaily.mockReset();
  });

  it('renders loading state initially', async () => {
    // Configurar el mock de fetchForecastDaily para devolver una promesa pendiente
    fetchForecastDaily.mockResolvedValueOnce(new Promise(() => {}));

    render(<Forecast location={{ latitude: 0, longitude: 0 }} />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();
  });

  it('renders error state if forecast data fetch fails', async () => {
    // Configurar el mock de fetchForecastDaily para devolver un error
    fetchForecastDaily.mockRejectedValueOnce(
      new Error('Failed to fetch forecast'),
    );

    render(<Forecast location={{ latitude: 0, longitude: 0 }} />);

    // Esperar a que se muestre el mensaje de error
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });
});
