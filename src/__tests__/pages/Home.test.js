import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Home from '../../pages/Home';

let Component;

beforeEach(() => {
  Component = render(
    <Home />
  );
});

afterEach(cleanup);

describe('Home Page', () => {
  it('renders sidebar', () => {
    const { getByText } = Component;
    const text = getByText(/Sidebar/i);
    expect(text).toBeInTheDocument();
  });

  it('renders Main content area', () => {
    const { getByText } = Component;
    const text = getByText(/Main Content of page/i);
    expect(text).toBeInTheDocument();
  });
});
