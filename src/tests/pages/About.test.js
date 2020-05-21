import React from 'react';
import { render } from '@testing-library/react';
import About from '../../pages/About';

describe("Cart Page", () => {
  it('renders text: About us page', () => {
    const { getByText } = render(<About />);
    const text = getByText(/About us page/i);
    expect(text).toBeInTheDocument();
  });
});
