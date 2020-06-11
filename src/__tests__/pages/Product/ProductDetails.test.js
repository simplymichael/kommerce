import React from 'react';
import { render, cleanup } from '@testing-library/react';
import ProductDetails from '../../../pages/Product/ProductDetails';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../../test-utils';
import strings from '../../../resources/strings';

let Component;
const ConnectedComponent = bindComponentToStore(store)(
  wrapComponentInRouter(ProductDetails));

beforeEach(() => {
  Component = render(
    <ConnectedComponent
      productId={1}
      onProductReady={(product) => product} />
  );
});

afterEach(cleanup);

describe('Product Details Component', () => {
  it('renders the passed product', async () => {
    const { findByRole } = Component;
    const productNameContainer = await findByRole('product-name');
    const productImage = await findByRole('product-image');
    const addToCartBtn = await findByRole('add-to-cart-button');

    expect(productNameContainer).toBeInTheDocument();
    expect(productNameContainer.textContent).not.toBeNull();
    expect(productImage).toBeInTheDocument();
    expect(productImage.getAttribute('src')).not.toBeNull();
    expect(addToCartBtn).toBeInTheDocument();
    expect(addToCartBtn.textContent).toMatch(
      strings.pages.cart().addToCart.text);
  });
});
