import React from 'react';
import { act, render, cleanup, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProductSummary from '../../../components/Products/ProductSummary';
import products from '../../../__DATA__/products';

const product = products.slice(0, 1).pop();
product.defaultImage = product.images.find(image => image.default === true);

let Component;

beforeEach(() => {
  Component = render(
    <BrowserRouter>
      <ProductSummary
        product={product}
        addToCart={addToCartProcessor} />
    </BrowserRouter>
  );
});

afterEach(cleanup);

const makeAddToCartMsg = ({ color, size, quantity }) => {
  return (`Product added to cart with following details:
    color: ${color},
    size: ${size},
    quantity: ${quantity}`
  );
};
const addToCartProcessor = jest.fn((product, { color, size, quantity }) => {
  return makeAddToCartMsg({ color, size, quantity });
});

describe('ProductSummary', () => {

  it('renders the passed product', () => {
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

  it(`calls the addToCart function
    when the add to cart button is clicked`, () => {
    const { getByRole } = Component;
    const productId = product.id;
    const renderedProduct = getByRole(`product-${productId}-summary`);

    expect(renderedProduct).toBeInTheDocument();

    const addToCartBtn = renderedProduct.querySelector(
      '[role="add-to-cart-button"]');
    const addToCartMsg = makeAddToCartMsg({
      color: product.color,
      size: product.size,
      quantity: 1
    });

    // Assert that add to cart function has not been called
    // since the 'add to cart' button has not been clicked
    expect(addToCartProcessor).not.toHaveBeenCalled();

    // Simulate clicking the 'add to cart button' twice
    act(() => {
      fireEvent.click(addToCartBtn);
      fireEvent.click(addToCartBtn);
    });

    // Assert that the add to cart function was called twice

    expect(addToCartProcessor).toHaveBeenCalledTimes(2);
    expect(addToCartProcessor.mock.results[0].value).toEqual(addToCartMsg);
    expect(addToCartProcessor.mock.results[1].value).toEqual(addToCartMsg);
  });
});
