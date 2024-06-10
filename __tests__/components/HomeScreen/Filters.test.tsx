import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Filters from '@/components/HomeScreen/Filters';
import { useRouter } from 'next/navigation';
import { Country, State, City } from 'country-state-city';
import { fetchReverseGeocoding } from '@/actions/Countries';

// Mock the next/navigation useRouter hook
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn().mockReturnValue('/'),
}));

jest.mock('query-string', () => ({
  //mock whatever you use from query-string
  parse: jest.fn(),
  stringify: jest.fn(),
}));

// Mock formik useFormik
jest.mock('formik', () => ({
  useFormik: jest.fn().mockReturnValue({
    handleSubmit: jest.fn(),
    values: {
      unit: {
        label: 'Celsius',
        value: 'metric',
      },
      country: null,
      state: null,
      city: null,
    },
    setFieldValue: jest.fn(),
  }),
}));

// Mock country-state-city
jest.mock('country-state-city', () => ({
  Country: {
    getCountryByCode: jest.fn(),
  },
  State: {
    getStatesOfCountry: jest.fn(),
    getStateByName: jest.fn(),
  },
  City: {
    getCitiesOfState: jest.fn(),
    getCityByName: jest.fn(),
  },
}));

jest.mock('../../../actions/Countries', () => ({
  fetchReverseGeocoding: jest.fn(),
}));

jest.mock('../../../shared', () => ({
  Units: [
    { label: 'Celsius', value: 'metric' },
    { label: 'Fahrenheit', value: 'imperial' },
    { label: 'Kelvin', value: 'standard' },
  ],
  Countries: [
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
  ],
}));

describe('Filters', () => {
  const mockQuery = { unit: 'metric' };
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Filters component', () => {
    render(<Filters query={mockQuery} />);

    expect(screen.getByText('Filtros de busqueda')).toBeInTheDocument();
    expect(screen.getByLabelText('Unidades')).toBeInTheDocument();
    expect(screen.getByLabelText('País')).toBeInTheDocument();
    expect(screen.getByLabelText('Estado')).toBeInTheDocument();
    expect(screen.getByLabelText('Ciudad')).toBeInTheDocument();
  });
});
