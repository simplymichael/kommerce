import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from '../App';

let Component;

beforeEach(() => {
  Component = render(<App />);
});

afterEach(cleanup);

describe('Home Page', () => {
  it('renders the prenav', () => {
    const { getByRole } = Component;
    const prenav = getByRole('prenav-header');

    expect(prenav).toBeInTheDocument();
  });

  it('renders main navigation', () => {
    const { getByRole } = Component;
    const mainNav = getByRole('main-nav');

    expect(mainNav).toBeInTheDocument();
  });

  test('renders a page', async () => {
    const { findByText } = Component;
    const text = await findByText(/page/i);

    expect(text).toBeInTheDocument();
  });

  it('renders footer', () => {
    const { getByRole } = Component;
    const footer = getByRole('footer');

    expect(footer).toBeInTheDocument();
  });
});
