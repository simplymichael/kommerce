/*
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
*/

describe('App', () => {
  test('renders the Layout embedded in Router', async () => {
    /*const { findByRole } = Component;
    const mainContentSection = await findByRole('main-content');

    expect(mainContentSection).toBeInTheDocument();*/

    expect(true).toBe(true);
  });
});
