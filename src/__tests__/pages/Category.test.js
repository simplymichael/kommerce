import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import Category from '../../pages/Category';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../test-utils';

let Component;
const ConnectedComponent = bindComponentToStore(store)(
  wrapComponentInRouter(Category));

// mimic the BrowserRouter's match object
const match = {
  params: {
    id: 'electronics',
  }
};

beforeEach(() => {
  Component = render(
    <ConnectedComponent match={match} />
  );
});

afterEach(cleanup);

describe('Category Page', () => {
  it('renders Sidebar', () => {
    const { getByRole } = Component;
    const sidebar = getByRole('sidebar');
    expect(sidebar).toBeInTheDocument();
  });

  it('renders Main content area', () => {
    const { getByRole } = Component;
    const mainContentSection = getByRole('main-content');
    expect(mainContentSection).toBeInTheDocument();
  });
});
