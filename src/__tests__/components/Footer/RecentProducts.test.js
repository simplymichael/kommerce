import React from 'react';
import {
  render,
  cleanup,
  waitForElement,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import RecentProducts from '../../../components/Footer/RecentProducts';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../../test-utils';

afterEach(cleanup);

describe('RecentProducts', () => {
  let Component;
  const ConnectedComponent = bindComponentToStore(store)(
    wrapComponentInRouter(RecentProducts));

  it('displays the list of passed products', async () => {

    Component = render(
      <ConnectedComponent />
    );

    const { container, queryByRole, queryAllByRole } = Component;
    const productRegex = /recent-product-(\d)-container/i;

    await waitForElementToBeRemoved(() => queryByRole(
      'recent-products-loading-indicator'));

    const displayedProducts = await waitForElement(() =>
      queryAllByRole(productRegex));

    expect(displayedProducts.length).toBeGreaterThan(0);
    expect(container.firstChild).not.toBeNull();

    // Iterate the products, and make assertions about each product
    displayedProducts.forEach((productContainer) => {
      const matches = productRegex.exec(productContainer.getAttribute('role'));
      const productId = matches[1];
      const { protocol, hostname } = location; // eslint-disable-line
      const detailUrl = `${protocol}//${hostname}/products/${productId}`;

      const image = productContainer.querySelector('[role="product-image"]');
      const nameBox = productContainer.querySelector('[role="product-name"]');
      const productName = nameBox.textContent;

      expect(productContainer.href).toEqual(detailUrl);
      expect(image.getAttribute('src')).not.toBeNull();
      expect(productName).not.toBeNull();
    });
  });
});
