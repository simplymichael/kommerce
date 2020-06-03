import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import Prenav from '../../../components/Prenav';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../../test-utils';

let Component;
const ConnectedComponent = bindComponentToStore(store)(
  wrapComponentInRouter(Prenav));

beforeEach(() => {
  Component = render(
    <ConnectedComponent />
  );
});

afterEach(cleanup);

describe('Prenav section', () => {
  it('renders search form', () => {
    const { getByRole } = Component;
    const searchForm = getByRole('search-form');

    expect(searchForm).toBeInTheDocument();
  });
});
