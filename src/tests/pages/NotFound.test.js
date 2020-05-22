import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../../pages/NotFound';

describe('404 error Page', () => {
  it('renders text: 404: Page Not Found', () => {
    const { getByText } = render(<NotFound />);
    const text = getByText(/404: Page Not Found/i);
    expect(text).toBeInTheDocument();
  });
});
