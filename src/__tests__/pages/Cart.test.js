import React from 'react';
import {
  render,
  cleanup,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import Cart from '../../pages/Cart';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../test-utils';

let Component;
const ConnectedCart = bindComponentToStore(store)(wrapComponentInRouter(Cart));

beforeEach(() => {
  Component = render(
    <ConnectedCart />
  );
});

afterEach(cleanup);

describe('Cart Page', () => {
  it('does not render Sidebar', () => {
    const { getByRole } = Component;

    function sidebarErrorThrower () {
      getByRole('sidebar');
    }

    expect(sidebarErrorThrower).toThrow();
  });

  it('renders Main content area', () => {
    const { getByRole } = Component;
    const mainContentSection = getByRole('main-content');
    expect(mainContentSection).toBeInTheDocument();
  });

  describe('Main content area', () => {
    it('does not render text: Cart page', async () => {
      const { getByText, getByRole } = Component;

      await waitForElementToBeRemoved(() =>
        getByRole('cart-items-loading-indicator'));

      function notFoundTextErrorThrower() {
        getByText(/Cart page/i);
      }

      expect(notFoundTextErrorThrower).toThrow();
    });
  });
});
