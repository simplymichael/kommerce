import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from '../../../components/Footer';

let Component;

beforeEach(() => {
  Component = render(
    // Wrap the Footer in BrowserRouter,
    // since it uses the Link element
    <BrowserRouter>
      <Footer />
    </BrowserRouter>
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
