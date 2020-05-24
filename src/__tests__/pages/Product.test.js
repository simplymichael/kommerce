import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Product from '../../pages/Product';
import { wrapComponentInRouter } from '../test-utils';
import products from '../../__DATA__/products';

const product = products.slice(0, 1).pop();

let Component;

const WrappedComponent = wrapComponentInRouter(Product);

// mimic the BrowserRouter's match object
const match = {
  params: {
    id: 1
  }
};

beforeEach(() => {
  Component = render(
    <WrappedComponent product={product} match={match} />
  );
});

afterEach(cleanup);

describe('Product details Page', () => {
  it('renders the passed product', () => {
    const { getByRole } = Component;
    const renderedProduct = getByRole('product-details-container');

    expect(renderedProduct).toBeInTheDocument();

    const productNameContainer = renderedProduct.querySelector(
      '[role="product-name"]');
    const productImage = renderedProduct.querySelector('[role="product-image"]');
    const addToCartBtn = renderedProduct.querySelector(
      '[role="add-to-cart-button"]');

    expect(productNameContainer.textContent).toEqual(product.name);
    expect(productImage.getAttribute('src')).not.toBeNull();
    expect(productImage.getAttribute('src')).toEqual(product.defaultImage.url);
    expect(addToCartBtn).toBeInTheDocument();
    expect(addToCartBtn.textContent).toMatch(/Add to cart/i);
  });
});
