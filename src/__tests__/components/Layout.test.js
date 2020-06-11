import React from 'react';
import { render, cleanup } from '@testing-library/react';
import Layout from '../../components/Layout';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter,
} from '../test-utils';

let Component;
const ConnectedLayout = bindComponentToStore(store)(
  wrapComponentInRouter(Layout));
const pageMeta = {
  title: 'Home',
  description: 'Responsive E-commerce store front, made with React.',
  keywords: [ 'shop','commerce',  'e-commerce' ],
};

beforeEach(() => {
  Component = render(
    <ConnectedLayout pageMeta={pageMeta}>
      <div role="sidebar"></div>
      <div role="main-content"></div>
    </ConnectedLayout>
  );
});

afterEach(cleanup);

describe('Layout', () => {
  it('renders the prenav', () => {
    const { getByRole } = Component;
    const prenav = getByRole('prenav-header');

    expect(prenav).toBeInTheDocument();
  });

  it('renders main navigation', () => {
    const { getByRole } = Component;
    const mainNav = getByRole('main-nav');

    expect(mainNav).toBeInTheDocument();
  });

  test('renders the passed page', async () => {
    const { findByRole } = Component;
    const mainContentSection = await findByRole('main-content');

    expect(mainContentSection).toBeInTheDocument();
  });

  it('renders footer', () => {
    const { getByRole } = Component;
    const footer = getByRole('footer');

    expect(footer).toBeInTheDocument();
  });
});
