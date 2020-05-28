import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Product from '../../pages/Product';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../test-utils';
import strings from '../../resources/strings';

let Component;
const ConnectedComponent = bindComponentToStore(store)(
  wrapComponentInRouter(Product));

// mimic the BrowserRouter's match object
const match = {
  params: {
    id: 1
  }
};

beforeEach(() => {
  Component = render(
    <ConnectedComponent match={match} />
  );
});

afterEach(cleanup);

describe('Product details Page', () => {
  it('renders the passed product', async () => {
    const { getByRole, findByRole } = Component;
    const productDetailsContainer = getByRole('product-details-container');

    expect(productDetailsContainer).toBeInTheDocument();

    const productNameContainer = await findByRole('product-name');
    const productImage = await findByRole('product-image');
    const addToCartBtn = await findByRole('add-to-cart-button');

    expect(productNameContainer).toBeInTheDocument();
    expect(productNameContainer.textContent).not.toBeNull();
    expect(productImage).toBeInTheDocument();
    expect(productImage.getAttribute('src')).not.toBeNull();
    expect(addToCartBtn).toBeInTheDocument();
    expect(addToCartBtn.textContent).toMatch(strings.cart.addToCart.text);
  });
});
