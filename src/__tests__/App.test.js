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
    const { findByRole } = Component;
    const mainContentSection = await findByRole('main-content');

    expect(mainContentSection).toBeInTheDocument();
  });

  it('renders footer', () => {
    const { getByRole } = Component;
    const footer = getByRole('footer');

    expect(footer).toBeInTheDocument();
  });
});
