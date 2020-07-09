import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
} from '@testing-library/react';
import Category from '../../pages/Category';
import {
  store,
  randomItem,
  bindComponentToStore,
  wrapComponentInRouter
} from '../test-utils';
import brands from '../../__DATA__/brands';
import colors from '../../__DATA__/colors';

let Component;
const getMockBrands = () => brands;
const getMockColors = () => colors;
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

  describe('Sidebar', () => {
    it('renders a list of brands', async () => {
      const brandRegex = /brand-([a-z1-9-_]+)-list-item/;
      const { getByRole, findAllByRole } = Component;
      const sidebar = getByRole('sidebar');
      const filtersContainer = sidebar.querySelector(
        '[role="filters-container"]');
      const brandsFilterContainer = filtersContainer.querySelector(
        '[role="brands-filter-container"]');

      // brandsFilterContainer has two children:
      // [0]: header element which holds the title 'Brand';
      // [1]: unordered list which holds the brands list items
      const ul = brandsFilterContainer.childNodes[1];
      const domBrands = ul.childNodes;
      const renderedBrands = await findAllByRole(brandRegex);

      // brandsFilterContainer's existence being truthy
      // means our retrieving it via filtersContainer,
      // which was retrieved via sidebar, succeeded.
      // Therefore, it exists inside filtersContainer
      // which exists inside sidebar section
      expect(brandsFilterContainer).toBeInTheDocument();

      // Iterate the brands, and make assertions about each
      renderedBrands.forEach((renderedBrand, index) => {
        // Assert that the brand exists inside brandsFilterContainer
        // (role=brands-filter-container)
        // which exists inside filtersContainer (role='filters-container')
        // which exists inside sidebar section.
        //
        // renderedBrand is the <li> element retrieved using react-testing-library
        // domBrands[index] is the <li> element retrieved via dom method
        // both hold:
        //   1. (checkbox) input element:
        //     '<input (type="checkbox") role="brand-ID-selector"'
        //   2. The brand name as text content
        expect(renderedBrands).toContain(domBrands[index]);
        expect(renderedBrand.firstChild).toEqual(domBrands[index].firstChild);
        expect(renderedBrand.secondChild).toEqual(domBrands[index].secondChild);
      });
    });

    it('renders a list of colors', async () => {
      const colorRegex = /color-([a-z1-9-_]+)-selector/;
      const { getByRole, findAllByRole } = Component;
      const sidebar = getByRole('sidebar');
      const filtersContainer = sidebar.querySelector(
        '[role="filters-container"]');
      const colorsFilterContainer = filtersContainer.querySelector(
        '[role="colors-filter-container"]');

      // brandsFilterContainer has two children:
      // [0]: header element which holds the title 'Color';
      // [1]: div which holds the colors
      const div = colorsFilterContainer.childNodes[1];
      const domColors = div.childNodes;
      const renderedColors = await findAllByRole(colorRegex);

      // colorsFilterContainer's existence being truthy
      // means our retrieving it via filtersContainer,
      // which was retrieved via sidebar, succeeded.
      // Therefore, it exists inside filtersContainer
      // which exists inside sidebar section
      expect(colorsFilterContainer).toBeInTheDocument();

      // Iterate the brands, and make assertions about each
      renderedColors.forEach((renderedColor, index) => {
        // Assert that the color exists inside colorsFilterContainer
        // (role=colors-filter-container)
        // which exists inside filtersContainer (role='filters-container')
        // which exists inside sidebar section.
        //
        // renderedColor is the <span> color element
        // retrieved using react-testing-library
        // domColors[index] is the <span> color element retrieved via dom method
        expect(renderedColors).toContain(domColors[index]);
        expect(renderedColor.style.backgroundColor).toEqual(
          domColors[index].style.backgroundColor);
      });
    });

    it('renders a list of sizes', async () => {
      const sizeRegex = /size-([a-z1-9-_]+)-selector/;
      const { getByRole, findAllByRole } = Component;
      const sidebar = getByRole('sidebar');
      const filtersContainer = sidebar.querySelector(
        '[role="filters-container"]');
      const sizesFilterContainer = filtersContainer.querySelector(
        '[role="sizes-filter-container"]');

      // brandsFilterContainer has two children:
      // [0]: header element which holds the title 'Size';
      // [1]: div which holds the sizes
      const div = sizesFilterContainer.childNodes[1];
      const domSizes = div.childNodes;
      const renderedSizes = await findAllByRole(sizeRegex);

      // sizesFilterContainer's existence being truthy
      // means our retrieving it via filtersContainer,
      // which was retrieved via sidebar, succeeded.
      // Therefore, it exists inside filtersContainer
      // which exists inside sidebar section
      expect(sizesFilterContainer).toBeInTheDocument();

      // Iterate the brands, and make assertions about each
      renderedSizes.forEach((renderedSize, index) => {
        // Assert that the size exists inside sizesFilterContainer
        // (role=sizes-filter-container)
        // which exists inside filtersContainer (role='filters-container')
        // which exists inside sidebar section.
        //
        // renderedSize is the <span> span element
        // retrieved using react-testing-library
        // domColors[index] is the <span> size element retrieved via dom method
        expect(renderedSizes).toContain(domSizes[index]);
        expect(renderedSize.textContent).toEqual(domSizes[index].textContent);
      });
    });
  });

  describe('Sidebar Filters', () => {
    describe('ColorsFilter', () => {
      it('fetches and displays colors for filtering by color', async () => {
        const colors = getMockColors();
        const { getByRole, queryByTitle } = Component;
        const colorsContainer = getByRole('colors-filter-container');

        // Assert the color filters container contains the header:
        // <hX...>Color</hX>
        const filtersHeader = colorsContainer.querySelector('[role="colors-filter-header"]');
        expect(filtersHeader).not.toBeNull();
        expect(filtersHeader.textContent).toBe('Color');

        for(let i = 0; i < colors.length; i++) {
          let color = colors[i];

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
        }
      });

      it('toggles the color\'s "selected" status on click', async () => {
        const colors = getMockColors();
        const { getByRole, queryByRole } = Component;
        const colorsContainer = getByRole('colors-filter-container');

        for(let i = 0; i < colors.length; i++) {
          let color = colors[i];

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
        }
      });

      it('toggles the "selected" status for ONLY the clicked color', async () => {
        const colors = getMockColors();
        const { getByRole, queryByRole } = Component;
        const colorsContainer = getByRole('colors-filter-container');
        const color = randomItem(colors);

        for(let i = 0; i < colors.length; i++) {
          let currColor = colors[i];

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
        }
      });
    });

    describe('BrandsFilter', () => {
      it('fetches and displays brands for filtering by brand', async () => {
        const brands = getMockBrands();
        const { getByRole, queryByRole } = Component;
        const brandsContainer = getByRole('brands-filter-container');

        // Assert the color filters container contains the header:
        // <hX...>Color</hX>
        const filtersHeader = brandsContainer.querySelector('[role="brands-filter-header"]');
        expect(filtersHeader).not.toBeNull();
        expect(filtersHeader.textContent).toBe('Brand');

        for(let i = 0; i < brands.length; i++) {
          let brand = brands[i];

          // Wait for the brand to load.
          // Each brand is held inside a
          // <li role="...">
          // <input type="checkbox" /> BrandName
          // </li>
          const filterBtn = await waitForElement(() => queryByRole(
            `brand-${brand.value.replace(/\s+/g, '_')}-list-item`
          ));

          expect(filterBtn).not.toBeNull();
          expect(filterBtn.textContent).toBe(brand.name);

          // The list of brand(checkboxe)s are held inside a <ul> element,
          // which is held inside the brandsContainer div (role=brands-filter-container)
          expect(filterBtn.parentNode.parentNode).toBe(brandsContainer);
        }
      });
    });
  });
});
