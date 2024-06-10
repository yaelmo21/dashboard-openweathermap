import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { fetchWeather } from '@/actions/WeatherMap';
import CurrentWeather from '@/components/HomeScreen/CurrentWeather';

// Mock para fetchWeather
jest.mock('../../../actions/WeatherMap');

describe('CurrentWeather component', () => {
  beforeEach(() => {
    // Resetear el mock de fetchWeather antes de cada prueba
    fetchWeather.mockReset();
  });

  it('renders loading state initially', async () => {
    // Configurar el mock de fetchWeather para devolver una promesa pendiente
    fetchWeather.mockResolvedValueOnce(new Promise(() => {}));

    render(<CurrentWeather location={{ latitude: 0, longitude: 0 }} />);

    expect(screen.getByTestId('loading')).toBeInTheDocument();

    // Esperar a que se resuelva la promesa para asegurarse de que ya no esté en estado de carga
  });

  it('renders error state if weather data fetch fails', async () => {
    // Configurar el mock de fetchWeather para devolver un error
    fetchWeather.mockRejectedValueOnce(new Error('Failed to fetch weather'));

    render(<CurrentWeather location={{ latitude: 0, longitude: 0 }} />);

    // Esperar a que se muestre el mensaje de error
    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });

  it('renders weather data when fetched successfully', async () => {
    const mockWeatherData = {
      name: 'City',
      main: { temp: 20, temp_min: 15, temp_max: 25 },
      weather: [{ description: 'Cloudy' }],
    };

    // Configurar el mock de fetchWeather para devolver datos de clima
    fetchWeather.mockResolvedValueOnce(mockWeatherData);

    render(<CurrentWeather location={{ latitude: 0, longitude: 0 }} />);

    // Esperar a que se renderice el componente con los datos de clima
    await waitFor(() => {
      expect(screen.getByText('Clima en')).toBeInTheDocument();
      expect(screen.getByText('City')).toBeInTheDocument();
      expect(screen.getByText('20°')).toBeInTheDocument();
      expect(screen.getByText('Cloudy')).toBeInTheDocument();
    });
  });

  it('fetches weather data when location prop changes', async () => {
    // Configurar el mock de fetchWeather para devolver datos de clima
    fetchWeather.mockResolvedValueOnce({});

    const { rerender } = render(
      <CurrentWeather location={{ latitude: 0, longitude: 0 }} />,
    );

    // Cambiar la ubicación
    rerender(<CurrentWeather location={{ latitude: 50, longitude: 50 }} />);

    // Esperar a que se llame a fetchWeather con la nueva ubicación
    await waitFor(() => {
      expect(fetchWeather).toHaveBeenCalledWith({
        location: { latitude: 50, longitude: 50 },
        unit: undefined, // Opcional: verificar la unidad también
      });
    });
  });
});
