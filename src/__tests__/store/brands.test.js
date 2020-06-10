import { fromJS } from 'immutable';
import { initialState } from '../../store/brands/reducer';
import { reducer, fetchBrands, onBrandClick } from '../../store/brands';
import {
  fetchBrandsError,
  fetchBrandsSuccess,
  selectBrand,
  deselectBrand,
} from '../../store/brands/actions';
import {
  FETCH_BRANDS,
  FETCH_BRANDS_ERROR,
  FETCH_BRANDS_SUCCESS,

  BRAND_CLICKED,
  SELECT_BRAND,
  DESELECT_BRAND,
} from '../../store/brands/constants';
import Service from '../../services/Service';
import brands from '../../__DATA__/brands';

const getMockBrands = () => brands.slice();
const brandService = Service.getService('BrandService');

describe('Store:Brands', () => {
  describe('actions and reducers', () => {
    it('return the initial state', () => {
      expect(initialState).toEqual(fromJS({
        brands: [],
        fetchBrandsError: null,
        isFetchingBrands: false,
        selectedBrands: [],
      }));
    });

    test('action: FETCH_BRANDS updates "isFetchingBrands" from false to true', () => {
      expect(reducer(initialState, fetchBrands())).toEqual(fromJS({
        brands: [],
        fetchBrandsError: null,
        isFetchingBrands: true,
        selectedBrands: [],
      }));
    });

    test('action: FETCH_BRANDS_ERROR sets "fetchBrandsError" to specified error', () => {
      const error = new Error('Failed to fetch brands');

      expect(reducer(initialState, fetchBrandsError(error))).toEqual(fromJS({
        brands: [],
        fetchBrandsError: error,
        isFetchingBrands: false,
        selectedBrands: [],
      }));
    });

    test('action: FETCH_BRANDS_SUCCESS sets the brands to specified brands', () => {
      const data = getMockBrands();

      expect(reducer(initialState, fetchBrandsSuccess(data))).toEqual(fromJS({
        brands: data,
        fetchBrandsError: null,
        isFetchingBrands: false,
        selectedBrands: [],
      }));
    });
  });

  describe('fetchBrands() sagas and dispatch calls', () => {
    const mockFetchBrands = async dispatch => {
      dispatch(fetchBrands());

      try {
        dispatch(fetchBrandsSuccess(
          await brandService.getBrands()
        ));
      } catch(err) {
        dispatch(fetchBrandsError(err.toString()));
      }
    };

    it('dispatches "fetchBrandsSuccess(fetchedBrands) on success', async () => {
      const mockDispatch = jest.fn();
      const spy = jest
        .spyOn(brandService, 'getBrands')
        .mockImplementation(() => Promise.resolve(getMockBrands()));
      const expectedActions = [
        [{ type: FETCH_BRANDS }],
        [{
          type: FETCH_BRANDS_SUCCESS,
          payload: { brands: getMockBrands() }
        }],
      ];

      expect(spy).not.toHaveBeenCalled();

      await mockFetchBrands(mockDispatch);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(mockDispatch.mock.calls).toEqual(expectedActions);

      brandService.getBrands.mockRestore();
    });

    it('dispatches "fetchBrandsError(thrownError)" on error', async () => {
      const error = new Error('Network error');
      const mockDispatch = jest.fn();
      const spy = jest
        .spyOn(brandService, 'getBrands')
        .mockImplementation(() => {
          throw error;
        });
      const expectedActions = [
        [{ type: FETCH_BRANDS }],
        [{
          type: FETCH_BRANDS_ERROR,
          error: error.toString()
        }],
      ];

      expect(spy).not.toHaveBeenCalled();

      await mockFetchBrands(mockDispatch);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(mockDispatch.mock.calls).toEqual(expectedActions);

      brandService.getBrands.mockRestore();
    });
  });

  describe('brandClick sagas and dispatch calls', () => {
    const testBrand = getMockBrands().slice(0, 1).pop().name;
    const mockBrandClick = async (dispatch, brandSelected) => {
      dispatch(onBrandClick(testBrand, brandSelected));

      try {
        const action = brandSelected ? selectBrand : deselectBrand;

        dispatch(action(testBrand));
      } catch(err) {
        console.error(err);
      }
    };

    it('dispatches "selectBrand(clickedBrand) when second param to "onBrandClick" is truthy', async () => {
      const mockDispatch = jest.fn();
      const expectedActions = [
        [{
          type: BRAND_CLICKED,
          payload: {
            brand: testBrand,
            checked: true,
          }
        }],
        [{
          type: SELECT_BRAND,
          payload: { brand: testBrand }
        }],
      ];

      mockBrandClick(mockDispatch, true);

      expect(mockDispatch.mock.calls).toEqual(expectedActions);
    });

    it('dispatches "deselectBrand(clickedBrand) when second param to "onBrandClick" is falsy', async () => {
      const mockDispatch = jest.fn();
      const expectedActions = [
        [{
          type: BRAND_CLICKED,
          payload: {
            brand: testBrand,
            checked: false,
          }
        }],
        [{
          type: DESELECT_BRAND,
          payload: { brand: testBrand }
        }],
      ];

      mockBrandClick(mockDispatch, false);

      expect(mockDispatch.mock.calls).toEqual(expectedActions);
    });
  });
});
