import React from 'react';
import { render, screen } from '@testing-library/react';
import DeliveryPriceDetails from './DeliveryPriceDetails';

describe('DeliveryPriceDetails', () => {
  const priceDetails = {
    cartValue: 500,
    smallOrderSurcharge: 300,
    deliveryFee: 200,
    deliveryDistance: 500,
    totalPrice: 10
  };

  test('renders price details', () => {
    render(<DeliveryPriceDetails priceDetails={priceDetails} />);
    expect(screen.getByText(/Cart value/i)).toBeInTheDocument();
    expect(screen.getByText(/Delivery fee/i)).toBeInTheDocument();
    expect(screen.getByText(/Small Order Surcharge/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Price/i)).toBeInTheDocument();
  });

  test('displays correct price values', () => {
    render(<DeliveryPriceDetails priceDetails={priceDetails} />);
    expect(screen.getByText(/5,00/i)).toBeInTheDocument();
    expect(screen.getByText(/2/i)).toBeInTheDocument();
    expect(screen.getByText(/3/i)).toBeInTheDocument();
    expect(screen.getByText(/10/i)).toBeInTheDocument();
  });
});
