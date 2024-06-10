import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '@/components/Layout/Header';

describe('Header Component', () => {
  test('renders navigation links correctly', () => {
    render(<Header />);

    const dashboardLink = screen.getByText(/Dashboard/i);
    const aboutLink = screen.getByText(/About/i);

    expect(dashboardLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
  });

  test('mobile menu toggles correctly', () => {
    render(<Header />);

    const mobileMenuButton = screen.getByLabelText(/Open main menu/i);
    fireEvent.click(mobileMenuButton);

    const closeMobileMenuButton = screen.getByLabelText(/Close main menu/i);
    expect(closeMobileMenuButton).toBeInTheDocument();

    fireEvent.click(closeMobileMenuButton);
    expect(screen.queryByLabelText(/Close main menu/i)).toBeNull();
  });
});
