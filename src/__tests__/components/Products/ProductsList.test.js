import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ProductsList from '../../../components/Products/ProductsList';
import config from '../../../.config';
import apiFactory from '../../../__DATA__/api';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../../test-utils';

const api = apiFactory();
const products = api.products.slice().map(product => {
  product.defaultImage = product.images
    .filter(img => img.default === true)
    .pop();

  return product;
});
const perPage = config.products.perPage;

let Component;
const ConnectedProductsList = bindComponentToStore(store)(
  wrapComponentInRouter(ProductsList));

beforeEach(() => {
  Component = render(
    <ConnectedProductsList />
  );
});

afterEach(cleanup);

describe('ProductsList', () => {
  it('should render a list of products returned from the store', async () => {
    //const  { container, findAllByRole } = Component;
    const  { findAllByRole } = Component;
    const productRegex = /product-(\d)-summary/i;

    //await findAllByRole(productRegex);

    // container.childNodes includes the pagination div,
    // so the test with it fails.
    //const renderedList = container.childNodes;
    const renderedList = await findAllByRole('product-container');

    expect(renderedList).not.toBeNull();

    expect(renderedList.length).toEqual(perPage);

    [].forEach.call(renderedList, (productContainer, index) => {
      const passedProduct = products[index];
      const renderedProduct = productContainer.firstChild;
      const matches = productRegex.exec(renderedProduct.getAttribute('role'));

      renderedProduct.queryByRole = function(role) {
        return this.querySelector(`[role="${role}"]`);
      };

      const productId = matches[1];
      const productName = renderedProduct.queryByRole('product-name');
      const productImage = renderedProduct.queryByRole('product-image');
      const productSize = renderedProduct.queryByRole('product-size');
      const productColor  = renderedProduct.queryByRole('product-color');
      const productPrice = renderedProduct.queryByRole('product-price');

      expect(parseInt(productId)).toEqual(passedProduct.id);
      expect(productName.textContent).toEqual(passedProduct.name);
      expect(productSize.textContent).toEqual(passedProduct.size);
      expect(productColor.textContent).toEqual(passedProduct.color);
      expect(parseFloat(productPrice.textContent)).toEqual(
        parseFloat(passedProduct.price));
      expect(productImage.getAttribute('src')).toEqual(
        passedProduct.defaultImage.url);
      expect(renderedProduct.getAttribute('title')).toEqual(
        `${passedProduct.name} (Brand: ${passedProduct.brand}, Category: ${passedProduct.category})`);
    });
  });
});
