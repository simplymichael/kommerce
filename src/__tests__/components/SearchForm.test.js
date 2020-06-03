import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { act, render, cleanup, fireEvent } from '@testing-library/react';
import SearchForm from '../../components/SearchForm';

afterEach(cleanup);

describe('SearchForm', () => {
  let Component;

  it('renders text input field and input field collapse toggle button', () => {
    Component = render(
      <BrowserRouter>
        <SearchForm />
      </BrowserRouter>
    );

    const { getByRole } = Component;
    const searchForm = getByRole('search-form');
    const inputField = searchForm.querySelector('[role="search-input-field"]');
    const toggleBtn = searchForm.querySelector(
      '[role="input-field-toggle-button"]');

    expect(inputField).toBeInTheDocument();
    expect(toggleBtn).toBeInTheDocument();
  });

  it(`toggles input field collapse state
    when toggle button is clicked`, async () => {
    Component = render(
      <BrowserRouter>
        <SearchForm />
      </BrowserRouter>
    );

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
