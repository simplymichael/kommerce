import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Home from '../../pages/Home';
import { wrapComponentInRouter } from '../test-utils';

let Component;
const WrappedHome = wrapComponentInRouter(Home);

beforeEach(() => {
  Component = render(
    <WrappedHome />
  );
});

afterEach(cleanup);

describe('Home Page', () => {
  it('renders sidebar', () => {
    const { getByText } = Component;
    const text = getByText(/Sidebar/i);
    expect(text).toBeInTheDocument();
  });

  it('renders Main content area', () => {
    const { getByRole } = Component;
    const mainContentSection = getByRole('main-content');
    expect(mainContentSection).toBeInTheDocument();
  });

  describe('Main content area', () => {
    const productRegex = /product-(\d)-summary/i;

    it('renders a list of products', async () => {
      const { getByRole, findAllByRole } = Component;
      const mainContentSection = getByRole('main-content');
      const productsContainer = mainContentSection.querySelector(
        '[role="products-list-container"]');
      const domProducts = productsContainer.childNodes;
      const renderedProducts = await findAllByRole(productRegex);

      // productContainer's existence being truthy
      // means our retrieving it via mainContentSection succeeded,
      // so it exists in mainContent section
      expect(productsContainer).toBeInTheDocument();
      expect(renderedProducts).not.toBeNull();

      // Iterate the products, and make assertions about each product
      renderedProducts.forEach((renderedProduct, index) => {
        // Assert that the product exists inside productContainer
        // (role=products-list-container)
        // which exists inside main content section.
        //
        // renderedProduct is the '<div role="product-ID-summary"'
        // domProducts[index] is the <div class="col-md3">
        // which holds the '<div role="product-ID-summary"'
        expect(renderedProduct).toEqual(domProducts[index].firstChild);
      });
    });

    test('products container do not link to detail page', async () => {
      const { findAllByRole } = Component;

      let renderedProducts = await findAllByRole(productRegex);

      renderedProducts.forEach((renderedProduct) => {
        // The product (container) itself should not be a link,
        // as it contains other elements like the 'add to cart' button
        expect(renderedProduct.href).toBeFalsy();
      });
    });

    test('products name and image link to detail page', async () => {
      const { findAllByRole } = Component;
      const renderedProducts = await findAllByRole(productRegex);

      renderedProducts.forEach((renderedProduct) => {
        const matches = productRegex.exec(renderedProduct.getAttribute('role'));
        const productId = matches[1];

        const productDetailPage = `/products/${productId}`;
        const { hostname, protocol } = location; // eslint-disable-line
        const productDetailUrl = `${protocol}//${hostname}${productDetailPage}`;

        renderedProduct.queryByRole = function(role) {
          return this.querySelector(`[role="${role}"]`);
        };

        const nameLink = renderedProduct.queryByRole('product-name-link');
        const imageLink = renderedProduct.queryByRole('product-image-link');

        expect(nameLink.href).toEqual(productDetailUrl);
        expect(imageLink.href).toEqual(productDetailUrl);
      });
    });
  });
});
