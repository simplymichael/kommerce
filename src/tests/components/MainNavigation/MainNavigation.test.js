import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainNavigation from '../../../components/MainNavigation';

let Component;

beforeEach(() => {
  Component = render(
    // Wrap the Footer in BrowserRouter,
    // since it uses the Link element
    <BrowserRouter>
      <MainNavigation />
    </BrowserRouter>
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

    expect(navItems.length).toBe(6); // 4 categories + home + search form
    expect(categoryItems.length).toBe(4);

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
