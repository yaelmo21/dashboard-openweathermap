import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Select from '@/components/ui/Select';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

describe('Select component', () => {
  it('renders with label and default value', () => {
    const { getByText } = render(
      <Select label='Test Select' value={options[0]} options={options} />,
    );
    expect(getByText('Test Select')).toBeInTheDocument();
    expect(getByText('Option 1')).toBeInTheDocument();
  });

  it('renders without label and default value', () => {
    const { getByText } = render(<Select value={null} options={options} />);
    expect(getByText('Seleccione un elemento')).toBeInTheDocument();
  });

  it('updates value on selection', async () => {
    const handleChange = jest.fn();
    const { getByRole, getByText } = render(
      <Select
        label='Test Select'
        value={null}
        onChange={handleChange}
        options={options}
      />,
    );
    fireEvent.click(getByRole('button'));
    await waitFor(() => getByText('Option 1'));
    fireEvent.click(getByText('Option 2'));
    expect(handleChange).toHaveBeenCalledWith(options[1]);
  });

  it('renders disabled', () => {
    const { getByRole } = render(
      <Select label='Test Select' value={null} options={options} disabled />,
    );
    expect(getByRole('button')).toBeDisabled();
  });
});
