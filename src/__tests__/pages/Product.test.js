import React from 'react';
import { render } from '@testing-library/react';
import Product from '../../pages/Product';

describe('Product details Page', () => {
  it('renders text: Product details page', () => {
    const { getByText } = render(<Product />);
    const text = getByText(/Product details page/i);
    expect(text).toBeInTheDocument();
  });
});
