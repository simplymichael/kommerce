import React from 'react';
import { render, cleanup } from '@testing-library/react';
import NavigationList from '../../../components/MainNavigation/NavigationList';
import {
  store,
  bindComponentToStore,
  wrapComponentInRouter
} from '../../test-utils';


let Component;
const ConnectedComponent = bindComponentToStore(store)(
  wrapComponentInRouter(NavigationList));

beforeEach(() => {
  Component = render(
    <ConnectedComponent />
  );
});

afterEach(cleanup);

describe('Navigation List', () => {
  it('displays links to the category pages', async () => {

    const { container } = Component;
    const navItems = container.children;

    expect(navItems.length).toBeGreaterThan(0);

    // Iterate the links, and make assertions about each link
    /*[].forEach.call(navItems, (navItem) => {
    });*/
  });
});
