import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NavigationList from '../../../components/MainNavigation/NavigationList';

afterEach(cleanup);

describe('Navigation List', () => {
  let Component;

  it('returns null if categories prop is not an array', () => {
    // consume the error from prop type validation
    const original = console.error;
    console.error = jest.fn();

    Component = render(
      <BrowserRouter>
        <NavigationList categories={{}} />
      </BrowserRouter>
    );

    const { container } = Component;

    expect(container.firstChild).toBeNull();

    console.error = original;
  });

  it(`displays links to the category pages of passed categories
    if categories prop is an array`, async () => {
    const categories = [
      { name: 'Shirts', slug: '', image: 'https://imgur.com/3u2mj7h.png' },
      { name: 'Shoes', slug: '', image: 'https://imgur.com/dV36lmS.png' },
      { name: 'Electronics', slug: '', image: 'https://imgur.com/3u2mj7h.png' },
    ];

    Component = render(
      // Wrap the NavigationList component in BrowserRouter,
      // since it uses the Link element
      <BrowserRouter>
        <NavigationList categories={categories} />
      </BrowserRouter>
    );

    const { container } = Component;
    const navItems = container.children;

    expect(navItems.length).toEqual(categories.length);

    // Iterate the links, and make assertions about each link
    [].forEach.call(navItems, (navItem, i) => {
      const testCategory = categories[i];
      const slug = testCategory.slug.length
        ? testCategory.slug
        : testCategory.name.toLowerCase().replace(/\s+/, '');
      const imageUrl = testCategory.image;
      const { protocol, hostname } = location; // eslint-disable-line
      const image = navItem.querySelector('img');
      const detailUrl = `${protocol}//${hostname}/categories/${slug}`;

      expect(navItem.href).toEqual(detailUrl);
      expect(image.getAttribute('src')).toEqual(imageUrl);
    });
  });
});
