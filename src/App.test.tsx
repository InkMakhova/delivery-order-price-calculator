import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test("renders DeliveryOrderCalculator component", () => {
  render(<App />);
  const calculatorElement = screen.getByText(/Delivery Order Price Calculator/i);
  expect(calculatorElement).toBeInTheDocument();
});

test("applies custom theme to components", () => {
  render(<App />);
  const buttonElement: HTMLElement = screen.getByText("Calculate delivery price");
  expect(buttonElement).toHaveStyle("padding-left: 1.5em");
  expect(buttonElement).toHaveStyle("padding-right: 1.5em");
  expect(buttonElement).toHaveStyle("border-radius: 5rem");
});
