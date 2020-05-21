import React from 'react';
import { render } from '@testing-library/react';
import Checkout from '../../pages/Checkout';

describe("Checkout Page", () => {
  it('renders text: Checkout page', () => {
    const { getByText } = render(<Checkout />);
    const text = getByText(/Checkout page/i);
    expect(text).toBeInTheDocument();
  });
});
