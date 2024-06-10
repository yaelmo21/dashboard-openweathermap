import React from 'react';
import { render } from '@testing-library/react';
import Loading from '@/components/ui/Loading';

describe('Loading component', () => {
  it('renders with default size', () => {
    const { container } = render(<Loading />);
    const spinner = container.querySelector('svg');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('text-black');
    expect(spinner).toHaveClass('animate-spin');
    expect(spinner).toHaveClass('text-4xl');
  });

  it('renders with specified size', () => {
    const { container } = render(<Loading size='large' />);
    const spinner = container.querySelector('svg');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('text-black');
    expect(spinner).toHaveClass('animate-spin');
    expect(spinner).toHaveClass('text-8xl');
  });
});
