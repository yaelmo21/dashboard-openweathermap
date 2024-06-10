import React from 'react';
import { render } from '@testing-library/react';
import Link from '@/components/ui/Link';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Link component', () => {
  it('renders the link correctly', () => {
    const { getByText } = render(<Link href='/test'>Test Link</Link>);
    expect(getByText('Test Link')).toBeInTheDocument();
  });

  it('applies activeClassName when the link is active', () => {
    (usePathname as jest.Mock).mockReturnValue('/test');

    const { getByText } = render(
      <Link href='/test' activeClassName='active'>
        Active Link
      </Link>,
    );
    expect(getByText('Active Link')).toHaveClass('active');
  });

  it('does not apply activeClassName when the link is not active', () => {
    (usePathname as jest.Mock).mockReturnValue('/another-path');

    const { getByText } = render(
      <Link href='/test' activeClassName='active'>
        Inactive Link
      </Link>,
    );
    expect(getByText('Inactive Link')).not.toHaveClass('active');
  });

  it('applies custom className', () => {
    const { getByText } = render(
      <Link href='/test' className='custom-class'>
        Custom Class Link
      </Link>,
    );
    expect(getByText('Custom Class Link')).toHaveClass('custom-class');
  });

  it('handles additional props correctly', () => {
    const { getByText } = render(
      <Link href='/test' aria-label='Test Label'>
        Test Link with Props
      </Link>,
    );
    expect(getByText('Test Link with Props')).toHaveAttribute(
      'aria-label',
      'Test Label',
    );
  });
});
