import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Footer from '../../../components/Footer';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../../test-utils';

let Component;
const ConnectedFooter = bindComponentToStore(store)(
  wrapComponentInRouter(Footer));

beforeEach(() => {
  Component = render(
    <ConnectedFooter />
  );
});

afterEach(cleanup);

describe('Page Footer', () => {
  it('renders social links', () => {
    const { getByRole } = Component;
    const links = getByRole('social-links');

    expect(links).toBeInTheDocument();
  });

  it('renders links to secondary pages', () => {
    const { getByRole } = Component;
    const secondaryPagesLinks = getByRole('secondary-pages-links');

    expect(secondaryPagesLinks).toBeInTheDocument();
  });

  it('renders latest products', async () => {
    const { queryByRole } = Component;

    const productsList = queryByRole('footer-recent-products-list-container');

    expect(productsList).toBeInTheDocument();
  });
});
