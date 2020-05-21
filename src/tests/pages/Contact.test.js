import React from 'react';
import { render } from '@testing-library/react';
import Contact from '../../pages/Contact';

describe("Contact Page", () => {
  it('renders text: Contact us page', () => {
    const { getByText } = render(<Contact />);
    const text = getByText(/Contact us page/i);
    expect(text).toBeInTheDocument();
  });
});
