import React from 'react';
import { render } from '@testing-library/react';
import Login from '../../pages/Login';

describe("Login Page", () => {
  it('renders text: Signin page', () => {
    const { getByText } = render(<Login />);
    const text = getByText(/Signin page/i);
    expect(text).toBeInTheDocument();
  });
});
