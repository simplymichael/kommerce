import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Login from '../../pages/Login';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../test-utils';

let Component;
const ConnectedLogin = bindComponentToStore(store)(wrapComponentInRouter(Login));

beforeEach(() => {
  Component = render(
    <ConnectedLogin />
  );
});

afterEach(cleanup);

describe('Login Page', () => {
  it('renders login form', () => {
    const { queryByRole } = Component;
    const form = queryByRole('login-form');
    expect(form).toBeInTheDocument();
  });
});
