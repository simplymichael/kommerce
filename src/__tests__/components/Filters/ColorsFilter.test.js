import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import ColorsFilter from '../../../components/Filters/ColorsFilter';
import colors from '../../../__DATA__/colors';

let Component;

afterEach(cleanup);

describe('ColorsFilter', () => {
  it('displays the passed colors for filtering by color', () => {
    Component = render(
      <ColorsFilter colors={colors} />
    );
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
      const filterBtn = queryByTitle(
        (title, el) => el.tagName === 'SPAN' &&
            title === `Click to filter by color: ${color.name}`
      );

      expect(filterBtn).not.toBeNull();
      expect(filterBtn.textContent).toBe('');

      // The list of color(button)s are held inside a div element,
      // which is held inside the colorsContainer div (role=colors-filter-container)
      expect(filterBtn.parentNode.parentNode).toBe(colorsContainer);
    });
  });

  it('invokes the "clickHandler" on color click', () => {
    const clonedColors = colors.slice();
    Component = render(
      <ColorsFilter
        colors={clonedColors}
        colorClickHandler={(color, select) => {
          const clickedColor = clonedColors.filter(c => c.name === color).pop();
          const index = clonedColors.findIndex(c => c.name === clickedColor.name);

          clonedColors[index].selected = select ? true : false;
        }} />
    );
    const { getByRole, queryByRole } = Component;
    const colorsContainer = getByRole('colors-filter-container');

    colors.forEach((color, index) => {
      // Each color is held inside a
      // <span...
      // role={`color-${color}-selector`}
      // title={Click to filter by color: color} />
      const filterBtn = queryByRole(
        `color-${color.name.replace(/\s+/g, '_')}-selector`
      );

      expect(filterBtn).not.toBeNull();

      // The list of color(button)s are held inside a div element,
      // which is held inside the colorsContainer div (role=colors-filter-container)
      expect(filterBtn.parentNode.parentNode).toBe(colorsContainer);

      // Before clicking, the color's "selected" status is false
      expect(clonedColors[index].selected).toBe(false);

      // Clicking the "filter" button selects the color,
      // and sets it "selected" status to true
      fireEvent.click(filterBtn);

      expect(clonedColors[index].selected).toBe(true);
    });
  });
});
