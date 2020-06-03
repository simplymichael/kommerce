import React from 'react';
import {
  render,
  cleanup,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import MainNavigation from '../../../components/MainNavigation';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../../test-utils';

let Component;
const ConnectedComponent = bindComponentToStore(store)(
  wrapComponentInRouter(MainNavigation));

beforeEach(() => {
  Component = render(
    <ConnectedComponent />
  );
});

afterEach(cleanup);

describe('Main Navigation', () => {
  it('renders site logo navigation as first navigation list item', () => {
    const { getByRole } = Component;
    const navbarNav = getByRole('navbar-nav');
    const { hostname, protocol } = location; //eslint-disable-line
    const homeLink = navbarNav.firstChild;
    const image = homeLink.firstChild;

    expect(navbarNav).toBeInTheDocument();
    expect(homeLink.href).toEqual(`${protocol}//${hostname}/`);
    expect(image.getAttribute('src')).toBe('logo.png');
  });

  it('renders links to category pages', async () => {
    const { findAllByRole, getByRole } = Component;
    await waitForElementToBeRemoved(() => getByRole(
      'categories-loading-indicator'));

    const navItems = await findAllByRole('navigation-list-item');
    const { hostname, protocol } = location; //eslint-disable-line
    const regex = new RegExp(`${protocol}//${hostname}/categories/`, 'i');
    const categoryItems = [].filter.call(navItems, (_, index) => {
      // remove home page link
      return index > 0;
    });

    expect(navItems.length).toBeGreaterThan(0); // categories + home + search form
    expect(categoryItems.length).toBeGreaterThan(0);

    categoryItems.forEach(item => {
      expect(item.href).toMatch(regex);
    });
  });
});
