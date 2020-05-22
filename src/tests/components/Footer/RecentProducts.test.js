import React from 'react';
import { render, cleanup, waitForElement } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import RecentProducts from '../../../components/Footer/RecentProducts';

afterEach(cleanup);

describe('RecentProducts', () => {
  let Component;

  it(`reports invalid prop type, and returns null
    if given ProductsList prop is not an array`, () => {
    const original = console.error;
    console.error = jest.fn();

    Component = render(
      <BrowserRouter>
        <RecentProducts productsList={{}} />
      </BrowserRouter>
    );

    const { container } = Component;

    expect(console.error).toHaveBeenCalledTimes(1);
    expect(container.firstChild).toBeNull();

    console.error = original;
  });

  it(`displays the list of passed products
    if productsList prop is an array`, async () => {
    const products = [
      {
        'id': 1,
        'name': 'First Item',
        'price': 10.00,
        'color': 'red',
        'size': 'XS',
        'brand': 'Abercrombie & Fitch',
        'dateAdded': '',
        'images': [
          { 'url': 'https://imgur.com/3u2mj7h.png', 'default': true },
          { 'url': 'https://imgur.com/dV36lmS.png', 'default': false },
          { 'url': 'https://imgur.com/3u2mj7h.png', 'default': false }
        ]
      },
      {
        'id': 2,
        'name': 'Second Item',
        'price': 10.00,
        'color': 'green',
        'size': 'XS',
        'brand': 'Abercrombie & Fitch',
        'dateAdded': '',
        'images': [
          { 'url': 'https://imgur.com/3u2mj7h.png', 'default': false },
          { 'url': 'https://imgur.com/dV36lmS.png', 'default': true },
          { 'url': 'https://imgur.com/3u2mj7h.png', 'default': false }
        ]
      }
    ];

    const productsList = products.map(product => {
      product.defaultImage = product.images
        .filter(img => img.default === true)
        .pop();

      return product;
    });

    Component = render(
      // Wrap the RecentProducts component in BrowserRouter,
      // since it uses the Link element
      <BrowserRouter>
        <RecentProducts productsList={productsList} />
      </BrowserRouter>
    );

    const { container, queryAllByRole } = Component;
    const productRegex = /recent-product-(\d)-container/i;
    const displayedProducts = await waitForElement(() =>
      queryAllByRole(productRegex));

    expect(displayedProducts.length).toBe(productsList.length);
    expect(container.firstChild).not.toBeNull();

    // Iterate the products, and make assertions about each product
    displayedProducts.forEach((productContainer, i) => {
      const testProduct = productsList[i];
      const matches = productRegex.exec(productContainer.getAttribute('role'));
      const productId = matches[1];
      const { protocol, hostname } = location; // eslint-disable-line
      const detailUrl = `${protocol}//${hostname}/products/${productId}`;

      const image = productContainer.querySelector('[role="product-image"]');
      const nameBox = productContainer.querySelector('[role="product-name"]');
      const productName = nameBox.textContent;

      expect(productContainer.href).toEqual(detailUrl);
      expect(image.getAttribute('src')).toEqual(testProduct.defaultImage.url);
      expect(productName).toMatch(testProduct.name);
    });
  });
});
