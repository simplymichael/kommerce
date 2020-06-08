import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NotFound from '../../pages/NotFound';
import { wrapComponentInRouter } from '../test-utils';

let Component;
const WrappedComponent = wrapComponentInRouter(NotFound);

beforeEach(() => {
  Component = render(
    <WrappedComponent />
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
