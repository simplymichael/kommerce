import React from 'react';
import { render, cleanup } from '@testing-library/react';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../test-utils';
import Checkout from '../../pages/Checkout';

let Component;
const ConnectedComponent = bindComponentToStore(store)(
  wrapComponentInRouter(Checkout));

beforeEach(() => {
  Component = render(
    <ConnectedComponent />
  );
});

afterEach(cleanup);

describe('Checkout Page', () => {
  it('renders text: Checkout', () => {
    const { getByText } = Component;
    const text = getByText(/Checkout/i);
    expect(text).toBeInTheDocument();
  });

  it('renders billing address section', () => {
    const { getByRole } = Component;
    const billingAddressSection = getByRole('billing-address-section');
    expect(billingAddressSection).toBeInTheDocument();
  });

  it('renders payment method section', () => {
    const { getByRole } = Component;
    const paymentMethodSection = getByRole('payment-method-section');
    expect(paymentMethodSection).toBeInTheDocument();
  });

  it('renders order review section', () => {
    const { getByRole } = Component;
    const orderReviewSection = getByRole('order-review-section');
    expect(orderReviewSection).toBeInTheDocument();
  });
});
