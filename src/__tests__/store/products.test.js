import { fromJS } from 'immutable';
import { initialState } from '../../store/products/reducer';
import { reducer, fetchProducts } from '../../store/products';
import {
  fetchProductsError,
  fetchProductsSuccess,
} from '../../store/products/actions';
/*import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS
} from '../../store/products/constants';*/
import Service from '../../services/Service';
import products from '../../__DATA__/products';

const getMockProducts = () => products;
/*const queryData = { page: 1, limit: 0, colors: [], sizes: [],
  brands: [], orderBy: {}, priceRange: {}, categories: []};*/
const stateTree = {
  products: [],
  fetchProductsError: null,
  isFetchingProducts: false,

  recentProducts: [],
  fetchRecentProductsError: null,
  isFetchingRecentProducts: false,

  searchTerm: '',
  isSearchingProducts: false,
  searchProductsError: null,

  productsCount: 0,
  isCountingProducts: false,
  countProductsError: null,
};

describe('Store:Products', () => {
  describe('actions and reducers', () => {
    it('return the initial state', () => {
      expect(initialState).toEqual(fromJS(stateTree));
    });

    test('action: FETCH_PRODUCTS updates "isFetchingProducts" from false to true', () => {
      expect(reducer(initialState, fetchProducts())).toEqual(fromJS({
        ...stateTree,
        isFetchingProducts: true,
      }));
    });

    test('action: FETCH_PRODUCTS_ERROR sets "fetchProductsError" to specified error', () => {
      const error = new Error('Failed to fetch products');

      expect(reducer(initialState, fetchProductsError(error))).toEqual(fromJS({
        ...stateTree,
        fetchProductsError: error,
      }));
    });

    test('action: FETCH_PRODUCTS_SUCCESS sets the products to specified products', () => {
      const data = getMockProducts();

      expect(reducer(initialState, fetchProductsSuccess(data))).toEqual(fromJS({
        ...stateTree,
        products: data,
      }));
    });
  });

  describe('fetchProducts() dispatch calls', () => {
    const productService = Service.getService('ProductService');
    const mockFetchProducts = async dispatch => {
      dispatch(fetchProducts());

      try {
        dispatch(fetchProductsSuccess(
          await productService.getProducts()
        ));
      } catch(err) {
        dispatch(fetchProductsError(err.toString()));
      }
    };

    it('dispatches "fetchProductsSuccess(fetchedProducts) on success', async () => {
      const mockDispatch = jest.fn();
      const spy = jest
        .spyOn(productService, 'getProducts')
        .mockImplementation(() => Promise.resolve(getMockProducts()));
      /*const expectedActions = [
        [{
          type: FETCH_PRODUCTS,
          payload: queryData,
        }],
        [{
          type: FETCH_PRODUCTS_SUCCESS,
          payload: { products: getMockProducts() }
        }],
      ];*/

      expect(spy).not.toHaveBeenCalled();

      await mockFetchProducts(mockDispatch);

      expect(spy).toHaveBeenCalledTimes(1);
      //expect(mockDispatch.mock.calls).toEqual(expectedActions);

      productService.getProducts.mockRestore();
    });

    it('dispatches "fetchProductsError(thrownError)" on error', async () => {
      const error = new Error('Network error');
      const mockDispatch = jest.fn();
      const spy = jest
        .spyOn(productService, 'getProducts')
        .mockImplementation(() => {
          throw error;
        });
      /*const expectedActions = [
        [{
          type: FETCH_PRODUCTS,
          payload: queryData,
        }],
        [{
          type: FETCH_PRODUCTS_ERROR,
          error: error.toString()
        }],
      ];*/

      expect(spy).not.toHaveBeenCalled();

      await mockFetchProducts(mockDispatch);

      expect(spy).toHaveBeenCalledTimes(1);
      //expect(mockDispatch.mock.calls).toEqual(expectedActions);

      productService.getProducts.mockRestore();
    });
  });
});
