import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SecondaryPages from '../../../components/Footer/SecondaryPages';

let Component;

beforeEach(() => {
  Component = render(
    // Wrap the Footer in BrowserRouter,
    // since it uses the Link element
    <BrowserRouter>
      <SecondaryPages />
    </BrowserRouter>
  );
});

afterEach(cleanup);

describe('SecondaryPages', () => {
  it('renders link to faq page', async () => {
    const { getByText } = Component;
    const faqPageLink = getByText(/faq/i);

    expect(faqPageLink).toBeInTheDocument();
  });

  it('renders link to about page', () => {
    const { getByText } = Component;
    const aboutPageLink = getByText(/about/i);
    expect(aboutPageLink).toBeInTheDocument();
  });

  it('renders link to contact page', () => {
    const { getByText } = Component;
    const contactPageLink = getByText(/contact/i);
    expect(contactPageLink).toBeInTheDocument();
  });

  it('renders link to privacy page', () => {
    const { getByText } = Component;
    const privacyPageLink = getByText(/privacy/i);

    expect(privacyPageLink).toBeInTheDocument();
  });
});
