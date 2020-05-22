import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SocialLinks from '../../../components/Footer/SocialLinks';

let Component;

beforeEach(() => {
  Component = render(
    // Wrap the Footer in BrowserRouter,
    // since it uses the Link element.
    <BrowserRouter>
      <SocialLinks />
    </BrowserRouter>
  );
});

afterEach(cleanup);

describe('Social Links', () => {
  it('renders behance social link', async () => {
    const { getByRole } = Component;
    const be_link = getByRole('behance_page_link');

    expect(be_link).toBeInTheDocument();
  });

  it('renders facebook social link', () => {
    const { getByRole } = Component;
    const fb_link = getByRole('facebook_page_link');

    expect(fb_link).toBeInTheDocument();
  });

  it('renders instagram social link', () => {
    const { getByRole } = Component;
    const inst_link = getByRole('instagram_page_link');

    expect(inst_link).toBeInTheDocument();
  });

  it('renders twitter social link', () => {
    const { getByRole } = Component;
    const twitter_link = getByRole('twitter_page_link');

    expect(twitter_link).toBeInTheDocument();
  });
});
