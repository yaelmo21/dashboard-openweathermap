import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import LocationWrap from '@/components/HomeScreen/LocationWrap';
import { Country } from 'country-state-city';

// Mock subcomponents
jest.mock('../../../components/HomeScreen/CurrentWeather', () => () => (
  <div>CurrentWeather Component</div>
));
jest.mock('../../../components/HomeScreen/Filters', () => () => (
  <div>Filters Component</div>
));
jest.mock('../../../components/HomeScreen/Forecast', () => () => (
  <div>Forecast Component</div>
));
jest.mock('../../../components/HomeScreen/ForecastHours', () => () => (
  <div>ForecastHours Component</div>
));

// Mock country-state-city
jest.mock('country-state-city', () => ({
  Country: {
    getCountryByCode: jest.fn(),
  },
}));

describe('LocationWrap', () => {
  const mockQuery = { unit: 'metric' };

  beforeEach(() => {
    (Country.getCountryByCode as jest.Mock).mockReturnValue({
      latitude: '23.6345',
      longitude: '-102.5528',
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders LocationWrap component and subcomponents', () => {
    render(<LocationWrap query={mockQuery} />);

    expect(screen.getByText('CurrentWeather Component')).toBeInTheDocument();
    expect(screen.getByText('Filters Component')).toBeInTheDocument();
    expect(screen.getByText('Forecast Component')).toBeInTheDocument();
    expect(screen.getByText('ForecastHours Component')).toBeInTheDocument();
  });

  test('handles geolocation error and fallback to Mexico location', async () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn((success, error) =>
        error({ message: 'User denied Geolocation' }),
      ),
    };
    // Mock the global navigator.geolocation object
    global.navigator.geolocation = mockGeolocation;

    render(<LocationWrap query={mockQuery} />);

    await waitFor(() => {
      expect(screen.getByText('User denied Geolocation')).toBeInTheDocument();
    });

    expect(Country.getCountryByCode).toHaveBeenCalledWith('MX');
  });

  test('retrieves and sets location from query parameters', () => {
    const mockQueryWithCoords = {
      unit: 'metric',
      latitude: 45.0,
      longitude: -75.0,
    };

    render(<LocationWrap query={mockQueryWithCoords} />);

    expect(
      screen.queryByText('User denied Geolocation'),
    ).not.toBeInTheDocument();
  });

  test('retries geolocation on error', async () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn((success, error) =>
        error({ message: 'User denied Geolocation' }),
      ),
    };
    global.navigator.geolocation = mockGeolocation;

    render(<LocationWrap query={mockQuery} />);

    await waitFor(() => {
      expect(screen.getByText('User denied Geolocation')).toBeInTheDocument();
    });

    const retryButton = screen.getByText('reintentar');
    fireEvent.click(retryButton);

    expect(mockGeolocation.getCurrentPosition).toHaveBeenCalledTimes(2);
  });

  test('closes error message', async () => {
    const mockGeolocation = {
      getCurrentPosition: jest.fn((success, error) =>
        error({ message: 'User denied Geolocation' }),
      ),
    };
    global.navigator.geolocation = mockGeolocation;

    render(<LocationWrap query={mockQuery} />);

    await waitFor(() => {
      expect(screen.getByText('User denied Geolocation')).toBeInTheDocument();
    });

    const closeButton = screen.getByRole('button', { name: /Cerrar/i });
    fireEvent.click(closeButton);

    expect(
      screen.queryByText('User denied Geolocation'),
    ).not.toBeInTheDocument();
  });
});
