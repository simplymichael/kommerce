import React from 'react';
import { act, render, cleanup, fireEvent } from '@testing-library/react';
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
  it('renders text input field and input field collapse toggle button', () => {
    const { getByRole } = Component;
    const searchForm = getByRole('search-form');
    const inputField = searchForm.querySelector('[role="search-input-field"]');
    const toggleBtn = searchForm.querySelector(
      '[role="input-field-toggle-button"]');

    expect(inputField).toBeInTheDocument();
    expect(toggleBtn).toBeInTheDocument();
  });

  it('toggle butto click toggles input field collapse state', async () => {
    const { getByRole } = Component;
    const searchForm = getByRole('search-form');
    const inputField = searchForm.querySelector('[role="search-input-field"]');
    const toggleBtn = searchForm.querySelector(
      '[role="input-field-toggle-button"]');

    // Assert that the input field is initially collapsed
    // I was having trouble using the bootstrap 'collapsed' attribute,
    // so, I had to add the 'data-collapsed' attribute, so I can test for it.
    // While it may not properly assert
    // that the input field is collapsed or expanded,
    // it nevertheless lets me know that the state is updating based on
    // the button click.
    expect(inputField.dataset.collapsed).toBe('true');

    // Click on the toggle button to reveal it.
    act(() => {
      fireEvent.click(toggleBtn);
    });

    // Assert that the input field is now expanded
    expect(inputField.dataset.collapsed).toBe('false');
  });
});
