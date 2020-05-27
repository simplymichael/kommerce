import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Home from '../../pages/Home';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../test-utils';

let Component;
const ConnectedHome = bindComponentToStore(store)(wrapComponentInRouter(Home));

beforeEach(() => {
  Component = render(
    <ConnectedHome />
  );
});

afterEach(cleanup);

describe('Home Page', () => {
  it('renders Sidebar', () => {
    const { getByRole } = Component;
    const sidebar = getByRole('sidebar');
    expect(sidebar).toBeInTheDocument();
  });

  it('renders Main content area', () => {
    const { getByRole } = Component;
    const mainContentSection = getByRole('main-content');
    expect(mainContentSection).toBeInTheDocument();
  });

  describe('Sidebar', () => {
    it('renders a list of brands', async () => {
      const brandRegex = /brand-([a-z1-9-_]+)-list-item/;
      const { getByRole, findAllByRole } = Component;
      const sidebar = getByRole('sidebar');
      const filtersContainer = sidebar.querySelector(
        '[role="filters-container"]');
      const brandsFilterContainer = filtersContainer.querySelector(
        '[role="brands-filter-container"]');

      // brandsFilterContainer has two children:
      // [0]: header element which holds the title 'Brand';
      // [1]: unordered list which holds the brands list items
      const ul = brandsFilterContainer.childNodes[1];
      const domBrands = ul.childNodes;
      const renderedBrands = await findAllByRole(brandRegex);

      // brandsFilterContainer's existence being truthy
      // means our retrieving it via filtersContainer,
      // which was retrieved via sidebar, succeeded.
      // Therefore, it exists inside filtersContainer
      // which exists inside sidebar section
      expect(brandsFilterContainer).toBeInTheDocument();

      // Iterate the brands, and make assertions about each
      renderedBrands.forEach((renderedBrand, index) => {
        // Assert that the brand exists inside brandsFilterContainer
        // (role=brands-filter-container)
        // which exists inside filtersContainer (role='filters-container')
        // which exists inside sidebar section.
        //
        // renderedBrand is the <li> element retrieved using react-testing-library
        // domBrands[index] is the <li> element retrieved via dom method
        // both hold:
        //   1. (checkbox) input element:
        //     '<input (type="checkbox") role="brand-ID-selector"'
        //   2. The brand name as text content
        expect(renderedBrands).toContain(domBrands[index]);
        expect(renderedBrand.firstChild).toEqual(domBrands[index].firstChild);
        expect(renderedBrand.secondChild).toEqual(domBrands[index].secondChild);
      });
    });

    it('renders a list of colors', async () => {
      const colorRegex = /color-([a-z1-9-_]+)-selector/;
      const { getByRole, findAllByRole } = Component;
      const sidebar = getByRole('sidebar');
      const filtersContainer = sidebar.querySelector(
        '[role="filters-container"]');
      const colorsFilterContainer = filtersContainer.querySelector(
        '[role="colors-filter-container"]');

      // brandsFilterContainer has two children:
      // [0]: header element which holds the title 'Color';
      // [1]: div which holds the colors
      const div = colorsFilterContainer.childNodes[1];
      const domColors = div.childNodes;
      const renderedColors = await findAllByRole(colorRegex);

      // colorsFilterContainer's existence being truthy
      // means our retrieving it via filtersContainer,
      // which was retrieved via sidebar, succeeded.
      // Therefore, it exists inside filtersContainer
      // which exists inside sidebar section
      expect(colorsFilterContainer).toBeInTheDocument();

      // Iterate the brands, and make assertions about each
      renderedColors.forEach((renderedColor, index) => {
        // Assert that the color exists inside colorsFilterContainer
        // (role=colors-filter-container)
        // which exists inside filtersContainer (role='filters-container')
        // which exists inside sidebar section.
        //
        // renderedColor is the <span> color element
        // retrieved using react-testing-library
        // domColors[index] is the <span> color element retrieved via dom method
        expect(renderedColors).toContain(domColors[index]);
        expect(renderedColor.style.backgroundColor).toEqual(
          domColors[index].style.backgroundColor);
      });
    });
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

      // productsContainer's existence being truthy
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
