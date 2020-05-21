import React from 'react';
import { render } from '@testing-library/react';
import Register from '../../pages/Register';

describe("Registration Page", () => {
  it('renders text: Signup page', () => {
    const { getByText } = render(<Register />);
    const text = getByText(/Signup page/i);
    expect(text).toBeInTheDocument();
  });
});
