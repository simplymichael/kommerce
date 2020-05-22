import React from 'react';
import { render } from '@testing-library/react';
import Home from '../../pages/Home';

describe('Home Page', () => {
  it('renders text: Home page', () => {
    const { getByText } = render(<Home />);
    const text = getByText(/Home page/i);
    expect(text).toBeInTheDocument();
  });
});
