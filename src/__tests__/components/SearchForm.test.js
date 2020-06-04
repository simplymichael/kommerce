import React from 'react';
import { render, cleanup } from '@testing-library/react';
import SearchForm from '../../components/SearchForm';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../test-utils';

let Component;
const ConnectedComponent = bindComponentToStore(store)(
  wrapComponentInRouter(SearchForm));

beforeEach(() => {
  Component = render(
    <ConnectedComponent />
  );
});
afterEach(cleanup);

describe('SearchForm', () => {
  it('renders text input field and search icon button', () => {
    const { getByRole } = Component;
    const searchForm = getByRole('search-form');
    const inputField = searchForm.querySelector('[role="search-input-field"]');
    const searchIconBtn = searchForm.querySelector(
      '[role="search-icon-button"]');

    expect(inputField).toBeInTheDocument();
    expect(searchIconBtn).toBeInTheDocument();
  });
});
