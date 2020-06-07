import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Register from '../../../pages/Register';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../../test-utils';

let Component;
const ConnectedComponent = bindComponentToStore(store)(
  wrapComponentInRouter(Register));

beforeEach(() => {
  Component = render(
    <ConnectedComponent />
  );
});

afterEach(cleanup);

describe('Registration Page', () => {
  it('renders registration form', () => {
    const { queryByRole } = Component;
    const form = queryByRole('registration-form');
    expect(form).toBeInTheDocument();
  });
});
