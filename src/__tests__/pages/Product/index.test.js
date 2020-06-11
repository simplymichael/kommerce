import React from 'react';
import {
  render,
  cleanup,
  waitForElementToBeRemoved
} from '@testing-library/react';
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

const timeout = 10000;

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
      jest.setTimeout(timeout);
      const { getByRole } = Component;
      const productDetailsContainer = getByRole('product-details-container');

      expect(productDetailsContainer).toBeInTheDocument();

      await waitForElementToBeRemoved(() => getByRole('product-loading-indicator'));

      productDetailsContainer.queryByRole = function(role) {
        return this.querySelector(`[role="${role}"]`);
      };

      const productNameContainer = productDetailsContainer.queryByRole(
        'product-name');
      const productImage = productDetailsContainer.queryByRole('product-image');
      const addToCartBtn = productDetailsContainer.queryByRole(
        'add-to-cart-button');

      expect(productNameContainer).toBeInTheDocument();
      expect(productNameContainer.textContent).not.toBeNull();
      expect(productImage).toBeInTheDocument();
      expect(productImage.getAttribute('src')).not.toBeNull();
      expect(addToCartBtn).toBeInTheDocument();
      expect(addToCartBtn.textContent).toMatch(
        strings.pages.cart().addToCart.text);
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
