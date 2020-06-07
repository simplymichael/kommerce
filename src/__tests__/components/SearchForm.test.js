import React from 'react';
import { fireEvent, render, cleanup } from '@testing-library/react';
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
  it('renders a search input field', () => {
    const { getByRole } = Component;
    const searchForm = getByRole('search-form');
    const inputField = searchForm.querySelector('[role="search-input-field"]');

    expect(inputField).toBeInTheDocument();
    expect(inputField.getAttribute('type')).toEqual('text');
    expect(inputField.getAttribute('placeholder')).toEqual('...');
  });

  it('renders search icon submit button', () => {
    const { getByRole } = Component;
    const searchForm = getByRole('search-form');
    const searchIconBtn = searchForm.querySelector(
      '[role="search-icon-button"]');

    expect(searchIconBtn).toBeInTheDocument();
  });

  describe('Search input field', () => {
    it('has an empty placeholder on focus', () => {
      const { getByRole } = Component;
      const searchForm = getByRole('search-form');
      const inputField = searchForm.querySelector('[role="search-input-field"]');

      expect(inputField).toBeInTheDocument();
      expect(inputField.getAttribute('placeholder')).toEqual('...');

      fireEvent.focus(inputField);

      expect(inputField.getAttribute('placeholder')).toEqual('');
    });

    it('has an ellipsis "..." placeholder on blur', () => {
      const { getByRole } = Component;
      const searchForm = getByRole('search-form');
      const inputField = searchForm.querySelector('[role="search-input-field"]');

      expect(inputField).toBeInTheDocument();
      expect(inputField.getAttribute('placeholder')).toEqual('...');

      fireEvent.focus(inputField);

      expect(inputField.getAttribute('placeholder')).toEqual('');

      fireEvent.blur(inputField);

      expect(inputField.getAttribute('placeholder')).toEqual('...');
    });
  });
});
