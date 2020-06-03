import React from 'react';
import { render, cleanup } from '@testing-library/react';
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

  it('renders links to category pages', () => {
    const { getByRole } = Component;
    const navbarNav = getByRole('navbar-nav');
    const navItems = navbarNav.children;
    const { hostname, protocol } = location; //eslint-disable-line
    const regex = new RegExp(`${protocol}//${hostname}/categories/`, 'i');
    const categoryItems = [].filter.call(navItems, (_, index) => {
      // remove home page link, and search form
      return index > 0 && (index < (navItems.length - 1));
    });

    expect(navItems.length).toBeGreaterThan(0); // categories + home + search form
    expect(categoryItems.length).toBeGreaterThan(0);

    categoryItems.forEach(item => {
      expect(item.href).toMatch(regex);
    });
  });

  it('renders search form', () => {
    const { getByRole } = Component;
    const searchForm = getByRole('top-navigation-search-form');

    expect(searchForm).toBeInTheDocument();
  });
});
