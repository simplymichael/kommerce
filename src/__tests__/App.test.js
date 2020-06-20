import React from 'react';
import { render, cleanup } from '@testing-library/react';
import App from '../App';
import { store, bindComponentToStore } from './test-utils';

let Component;
const ConnectedApp = bindComponentToStore(store)(App);

beforeEach(() => {
  Component = render(<ConnectedApp />);
});

afterEach(cleanup);


describe('App', () => {
  it('renders the page wrapper', () => {
    const { getByRole } = Component;
    const pageWrapper = getByRole('page-wrapper');

    expect(pageWrapper).toBeInTheDocument();
  });
});
