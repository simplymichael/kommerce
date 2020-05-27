import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ProductSummary from '../../../components/Products/ProductSummary';
import products from '../../../__DATA__/products';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../../test-utils';

const product = products.slice(0, 1).pop();
product.defaultImage = product.images.find(image => image.default === true);

let Component;
const ConnectedProductSummary = bindComponentToStore(store)(
  wrapComponentInRouter(ProductSummary));

beforeEach(() => {
  Component = render(
    <ConnectedProductSummary product={product} />
  );
});

afterEach(cleanup);

describe('ProductSummary', () => {
  it('displays a summary of the passed product', () => {
    const { getByRole } = Component;
    const productId = product.id;
    const renderedProduct = getByRole(`product-${productId}-summary`);

    expect(renderedProduct).toBeInTheDocument();

    const productDetailPage = `/products/${productId}`;
    const { hostname, protocol } = location; // eslint-disable-line
    const productDetailUrl = `${protocol}//${hostname}${productDetailPage}`;
    const imageLink = renderedProduct.querySelector(
      '[role="product-image-link"]');
    const nameLink = renderedProduct.querySelector(
      '[role="product-name-link"]');
    const productName = nameLink.textContent;
    const productImage = imageLink.querySelector(
      `[alt="${productName} image"]`);
    const addToCartBtn = renderedProduct.querySelector(
      '[role="add-to-cart-button"]');

    /**
     * Assertions, in order:
     * - Assert product summary contains link(s) to product detail page (1, 2)
     * - Assert product image is a link to product detail page (3)
     * - Assert product image link contains the (default) image (4, 5, 6)
     * - Assert product name is a link to product detail page (7)
     * - Assert product container has an "Add to cart" button (8, 9)
     */
    expect(imageLink).toBeTruthy();
    expect(nameLink).toBeTruthy();
    expect(imageLink.href).toEqual(productDetailUrl);
    expect(productImage).toBeTruthy();
    expect(productImage.getAttribute('src')).not.toBeNull();
    expect(productImage.getAttribute('src')).toEqual(product.defaultImage.url);
    expect(nameLink.href).toEqual(productDetailUrl);
    expect(addToCartBtn).toBeInTheDocument();
    expect(addToCartBtn.textContent).toMatch(/Add to cart/i);
  });
});
