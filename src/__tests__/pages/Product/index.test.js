import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Product from '../../../pages/Product';
import strings from '../../../resources/strings';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../../test-utils';

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
  it('renders product details section', async () => {
    const { getByRole } = Component;
    const productDetailsContainer = getByRole('product-details-container');

    expect(productDetailsContainer).toBeInTheDocument();
  });

  it('renders product reviews section', async () => {
    const { getByRole } = Component;
    const productReviewsContainer = getByRole('product-reviews-container');

    expect(productReviewsContainer).toBeInTheDocument();
  });

  describe('Product details section', () => {
    it('renders the passed product', async () => {
      const { findByRole, getByRole } = Component;
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

  describe('Product reviews section', () => {
    it('renders the product review form', async () => {
      const { getByRole } = Component;
      const productReviewForm = getByRole('product-review-form');

      expect(productReviewForm).toBeInTheDocument();
    });
  });
});
