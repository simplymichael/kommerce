import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from '@testing-library/react';
import ColorsFilter from '../../../components/Filters/ColorsFilter';
import {
  store,
  randomItem,
  bindComponentToStore,
  wrapComponentInRouter
} from '../../test-utils';
import colors from '../../../__DATA__/colors';


let Component;
const getMockColors = () => colors;
const ConnectedComponent = bindComponentToStore(store)(
  wrapComponentInRouter(ColorsFilter));

beforeEach(() => {
  Component = render(
    <ConnectedComponent />
  );
});

afterEach(cleanup);

describe('ColorsFilter', () => {
  it('fetches and displays colors for filtering by color', () => {
    const colors = getMockColors();
    const { getByRole, queryByTitle } = Component;
    const colorsContainer = getByRole('colors-filter-container');

    // Assert the color filters container contains the header:
    // <hX...>Color</hX>
    const filtersHeader = colorsContainer.querySelector('[role="colors-filter-header"]');
    expect(filtersHeader).not.toBeNull();
    expect(filtersHeader.textContent).toBe('Color');

    colors.forEach(async color => {

      // Wait for the color to load.
      // Each color is held inside a
      // <span... title={Click to filter by color: color} />
      const filterBtn = await waitForElement(() => queryByTitle(
        (title, el) => el.tagName === 'SPAN' &&
            title === `Click to filter by color: ${color.name}`
      ));

      expect(filterBtn).not.toBeNull();
      expect(filterBtn.textContent).toBe('');

      // The list of color(button)s are held inside a div element,
      // which is held inside the colorsContainer div (role=colors-filter-container)
      expect(filterBtn.parentNode.parentNode).toBe(colorsContainer);
    });
  });

  it('toggles the color\'s "selected" status on click', () => {
    const colors = getMockColors();
    const { getByRole, queryByRole } = Component;
    const colorsContainer = getByRole('colors-filter-container');

    colors.forEach(async color => {
      // Wait for the color filter button to load and become available in the page.
      // Each color is held inside a
      // <span...
      // role={`color-${color}-selector`}
      // title={Click to filter by color: color} />
      const filterBtn = await waitForElement(() => queryByRole(
        `color-${color.name.replace(/\s+/g, '_')}-selector`
      ));

      expect(filterBtn).not.toBeNull();

      // The list of color(button)s are held inside a div element,
      // which is held inside the colorsContainer div (role=colors-filter-container)
      expect(filterBtn.parentNode.parentNode).toBe(colorsContainer);

      // Before clicking, the title is: Click to filter by color: color
      expect(filterBtn.title).toBe(`Click to filter by color: ${color.name}`);

      // First click: selects the color,
      // and the title changes to: Click to clear color filter: color
      fireEvent.click(filterBtn);

      expect(filterBtn.title).toBe(`Click to clear color filter: ${color.name}`);

      // Clicking again deselects the color, and reverts the title
      fireEvent.click(filterBtn);

      expect(filterBtn.title).toBe(`Click to filter by color: ${color.name}`);
    });
  });

  it('toggles the "selected" status for ONLY the clicked color', () => {
    const colors = getMockColors();
    const { getByRole, queryByRole } = Component;
    const colorsContainer = getByRole('colors-filter-container');
    const color = randomItem(colors);

    colors.forEach(async currColor => {
      // Wait for the color filter button to load and become available in the page.
      // Each color is held inside a
      // <span...
      // role={`color-${color}-selector`}
      // title={Click to filter by color: color} />
      const filterBtn = await waitForElement(() => queryByRole(
        `color-${currColor.name.replace(/\s+/g, '_')}-selector`
      ));

      expect(filterBtn).not.toBeNull();

      // The list of color(button)s are held inside a div element,
      // which is held inside the colorsContainer div (role=colors-filter-container)
      expect(filterBtn.parentNode.parentNode).toBe(colorsContainer);

      // Before clicking, the title is: Click to filter by color: color
      expect(filterBtn.title).toBe(`Click to filter by color: ${currColor.name}`);

      if(currColor.name === color.name) {
        // First click: selects the color
        fireEvent.click(filterBtn);

        // Assert that the clicked color's title updates,
        // showing that it is now in the "selected" state
        expect(filterBtn.title).toBe(`Click to clear color filter: ${currColor.name}`);
      } else {
        // ... but other colors' titles remain unchanged,
        // meaning their "selected" state has not changed, i.e it is false
        expect(filterBtn.title).toBe(`Click to filter by color: ${currColor.name}`);
      }
    });
  });
});
