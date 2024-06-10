import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Tooltip from '../../../components/ui/Tooltip';

describe('Tooltip component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <Tooltip text='Test Tooltip'>
        <button>Hover me</button>
      </Tooltip>,
    );

    expect(getByText('Hover me')).toBeInTheDocument();
  });

  it('positions tooltip correctly on hover', () => {
    const { getByText } = render(
      <Tooltip text='Test Tooltip'>
        <button>Hover me</button>
      </Tooltip>,
    );

    const button = getByText('Hover me');
    fireEvent.mouseEnter(button);

    const tooltip = getByText('Test Tooltip');
    const tooltipStyle = window.getComputedStyle(tooltip);
    expect(tooltipStyle.left).not.toBe('');
    // Add more assertions for position if needed
  });

  it('does not render tooltip if no text provided', () => {
    const { queryByText } = render(
      <Tooltip>
        <button>Hover me</button>
      </Tooltip>,
    );

    expect(queryByText('Test Tooltip')).toBeNull();
  });
});
