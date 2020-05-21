import React from 'react';
import { render } from '@testing-library/react';
import Privacy from '../../pages/Privacy';

describe("Privacy policy Page", () => {
  it('renders text: Privacy policy page', () => {
    const { getByText } = render(<Privacy />);
    const text = getByText(/Privacy policy page/i);
    expect(text).toBeInTheDocument();
  });
});
