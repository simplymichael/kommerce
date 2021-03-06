import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NotFound from '../../pages/NotFound';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../test-utils';

let Component;
const ConnectedComponent = bindComponentToStore(store)(
  wrapComponentInRouter(NotFound));

beforeEach(() => {
  Component = render(
    <ConnectedComponent />
  );
});

afterEach(cleanup);

describe('404 error Page', () => {
  it('renders link back to home', () => {
    const { getByRole } = Component;
    const homeBackLink = getByRole('back-to-home-link');
    expect(homeBackLink).toBeInTheDocument();
  });
});
