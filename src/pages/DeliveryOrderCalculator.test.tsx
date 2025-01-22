import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeliveryOrderCalculator from './DeliveryOrderCalculator';

describe('DeliveryOrderCalculator', () => {
  test('renders the component', () => {
    render(<DeliveryOrderCalculator />);
    expect(screen.getByText(/Delivery Order Price Calculator/i)).toBeInTheDocument();
  });

  test('initial state is correct', () => {
    render(<DeliveryOrderCalculator />);
    expect(screen.getByTestId('venueSlug')).toHaveValue('home-assignment-venue-helsinki');
    expect(screen.getByTestId('cartValue')).toHaveValue('');
    expect(screen.getByTestId('userLatitude')).toHaveValue('');
    expect(screen.getByTestId('userLongitude')).toHaveValue('');
  });

  test('clears form on venue slug change', () => {
    render(<DeliveryOrderCalculator />);
    fireEvent.change(screen.getByTestId('cartValue'), { target: { value: '100' } });
    fireEvent.change(screen.getByTestId('userLatitude'), { target: { value: '60.057872481327195' } });
    fireEvent.change(screen.getByTestId('userLongitude'), { target: { value: '24.77798142454613' } });
    fireEvent.change(screen.getByTestId('venueSlug'), { target: { value: 'home-assignment-venue-tallinn' } });
    expect(screen.getByTestId('venueSlug')).toHaveValue('home-assignment-venue-tallinn');
    expect(screen.getByTestId('cartValue')).toHaveValue('');
    expect(screen.getByTestId('userLatitude')).toHaveValue('');
    expect(screen.getByTestId('userLongitude')).toHaveValue('');
  });

});
