import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ProductsList from '../../../../components/Products/ProductsList';
import productsData from '../../../../__DATA__/products';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../../../test-utils';

const products = productsData.slice().map(product => {
  product.defaultImage = product.images
    .filter(img => img.default === true)
    .pop();

  return product;
});

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
    const  { container, findAllByRole } = Component;
    const productRegex = /product-(\d)-summary/i;

    await findAllByRole(productRegex);

    const renderedList = container.childNodes;

    expect(renderedList).not.toBeNull();
    expect(renderedList.length).toEqual(products.length);

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
      const productBrand = renderedProduct.queryByRole('product-brand');
      const productPrice = renderedProduct.queryByRole('product-price');

      expect(parseInt(productId)).toEqual(passedProduct.id);
      expect(productName.textContent).toEqual(passedProduct.name);
      expect(productSize.textContent).toEqual(passedProduct.size);
      expect(productColor.textContent).toEqual(passedProduct.color);
      expect(productBrand.textContent).toEqual(passedProduct.brand);
      expect(parseFloat(productPrice.textContent)).toEqual(
        parseFloat(passedProduct.price));
      expect(productImage.getAttribute('src')).toEqual(
        passedProduct.defaultImage.url);
    });
  });
});