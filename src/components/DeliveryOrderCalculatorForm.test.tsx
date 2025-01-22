import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DeliveryOrderCalculatorForm from './DeliveryOrderCalculatorForm';

describe('DeliveryOrderCalculatorForm', () => {
  const mockDispatch = jest.fn();
  const mockClearPriceDetails = jest.fn();
  const mockSubmit = jest.fn();

  const orderDetails = {
    data: {
      venueSlug: 'home-assignment-venue-helsinki',
      cartValue: '1500',
      userLatitude: '60.0',
      userLongitude: '55.0'
    },
    error: null
  };

  test('renders the form', () => {
    render(
      <DeliveryOrderCalculatorForm
        orderDetails={orderDetails}
        dispatch={mockDispatch}
        clearPriceDetails={mockClearPriceDetails}
        submit={mockSubmit}
        pending={false}
      />
    );
    expect(screen.getByTestId('venueSlug')).toBeInTheDocument();
    expect(screen.getByTestId('cartValue')).toBeInTheDocument();
    expect(screen.getByTestId('userLatitude')).toBeInTheDocument();
    expect(screen.getByTestId('userLongitude')).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(
      <DeliveryOrderCalculatorForm
        orderDetails={orderDetails}
        dispatch={mockDispatch}
        clearPriceDetails={mockClearPriceDetails}
        submit={mockSubmit}
        pending={false}
      />
    );

    fireEvent.change(screen.getByTestId('venueSlug'), { target: { value: 'home-assignment-venue-tallinn' } });
    expect(mockDispatch).toHaveBeenLastCalledWith('data', {
      venueSlug: 'home-assignment-venue-tallinn',
      cartValue: "",
      userLatitude: "",
      userLongitude: ""
    });

    fireEvent.change(screen.getByTestId('cartValue'), { target: { value: '9' } });
    expect(mockDispatch).toHaveBeenLastCalledWith('data', { cartValue: "9" });

    fireEvent.change(screen.getByTestId('userLatitude'), { target: { value: '0.1' } });
    expect(mockDispatch).toHaveBeenLastCalledWith('data', { userLatitude: "0.1" });

    fireEvent.change(screen.getByTestId('userLongitude'), { target: { value: '0.2' } });
    expect(mockDispatch).toHaveBeenLastCalledWith('data', { userLongitude: "0.2" });
  });

  test('handles form submission', () => {
    render(
      <DeliveryOrderCalculatorForm
        orderDetails={orderDetails}
        dispatch={mockDispatch}
        clearPriceDetails={mockClearPriceDetails}
        submit={mockSubmit}
        pending={false}
      />
    );
    fireEvent.click(screen.getByText(/Calculate delivery price/i));
    expect(mockSubmit).toHaveBeenCalled();
  });

  test('get location button works', () => {
    render(
      <DeliveryOrderCalculatorForm
        orderDetails={orderDetails}
        dispatch={mockDispatch}
        clearPriceDetails={mockClearPriceDetails}
        submit={mockSubmit}
        pending={false}
      />
    );
    fireEvent.click(screen.getByText('Get location'));
    expect(mockDispatch).toHaveBeenLastCalledWith('error', "Geolocation is not supported by this browser.");
  })

  test('shows errors', () => {
    const errorOrderDetails = {
        data: {
            venueSlug: 'home-assignment-venue-helsinki',
            cartValue: '1500',
            userLatitude: '60.0',
            userLongitude: '55.0'
        },
        error: 'Test error'
    }
    render(
      <DeliveryOrderCalculatorForm
        orderDetails={errorOrderDetails}
        dispatch={mockDispatch}
        clearPriceDetails={mockClearPriceDetails}
        submit={mockSubmit}
        pending={false}
      />
    );
    expect(screen.getByText('Test error')).toBeInTheDocument();
  })
});

