import React from 'react';
import { render } from '@testing-library/react';
import Cart from '../../pages/Cart';

describe("Cart Page", () => {
  it('renders text: Cart page', () => {
    const { getByText } = render(<Cart />);
    const text = getByText(/Cart page/i);
    expect(text).toBeInTheDocument();
  });
});
