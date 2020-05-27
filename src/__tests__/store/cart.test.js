import { fromJS } from 'immutable';
import { initialState } from '../../store/cart/reducer';
import { reducer, fetchCartItems } from '../../store/cart';
import {
  fetchCartItemsError,
  fetchCartItemsSuccess,
} from '../../store/cart/actions';
import {
  FETCH_CART_ITEMS,
  FETCH_CART_ITEMS_ERROR,
  FETCH_CART_ITEMS_SUCCESS
} from '../../store/cart/constants';
import Service from '../../services/Service';

const getMockCartItems = () => [];
const stateTree = {
  items: [],
  fetchCartItemsError: null,
  isFetchingCartItems: false,
  itemsCount: 0,
  countCartItemsError: null,
  isCountingCartItems: false,
  addProductToCartError: null,
  addProductToCartList: [],
  removeProductFromCartError: null,
  removeProductFromCartList: [],
  isEmptyingCart: false,
  emptyCartError: null,
  isFetchingCartPrice: false,
  fetchCartPriceError: null,
  cartPriceData: {
    grandTotal: '0.00',
    subTotal: '0.00',
  },
};

describe('Store:Cart', () => {
  describe('actions and reducers', () => {
    it('return the initial state', () => {
      expect(initialState).toEqual(fromJS(stateTree));
    });

    test('action: FETCH_CART_ITEMS updates "isFetchingCartItems" from false to true', () => {
      expect(reducer(initialState, fetchCartItems())).toEqual(fromJS({
        ...stateTree,
        isFetchingCartItems: true,
      }));
    });

    test('action: FETCH_CART_ITEMS_ERROR sets "fetchCartItemsError" to specified error', () => {
      const error = new Error('Failed to fetch items');

      expect(reducer(initialState, fetchCartItemsError(error))).toEqual(fromJS({
        ...stateTree,
        fetchCartItemsError: error,
      }));
    });

    test('action: FETCH_CART_ITEMS_SUCCESS sets the cartItems to specified items', () => {
      const data = getMockCartItems();

      expect(reducer(initialState, fetchCartItemsSuccess(data))).toEqual(fromJS({
        ...stateTree,
        items: data,
      }));
    });
  });

  describe('fetchCartItems() dispatch calls', () => {
    const cartService = Service.getService('CartService');
    const mockFetchCartItems = async dispatch => {
      dispatch(fetchCartItems());

      try {
        dispatch(fetchCartItemsSuccess(
          await cartService.getItemsInCart()
        ));
      } catch(err) {
        dispatch(fetchCartItemsError(err.toString()));
      }
    };

    it('dispatches "fetchCartItemsSuccess(fetchedItems) on success', async () => {
      const mockDispatch = jest.fn();
      const spy = jest
        .spyOn(cartService, 'getItemsInCart')
        .mockImplementation(() => Promise.resolve(getMockCartItems()));
      const expectedActions = [
        [{ type: FETCH_CART_ITEMS }],
        [{
          type: FETCH_CART_ITEMS_SUCCESS,
          payload: { items: getMockCartItems() }
        }],
      ];

      expect(spy).not.toHaveBeenCalled();

      await mockFetchCartItems(mockDispatch);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(mockDispatch.mock.calls).toEqual(expectedActions);

      cartService.getItemsInCart.mockRestore();
    });

    it('dispatches "fetchCartItemsError(thrownError)" on error', async () => {
      const error = new Error('Network error');
      const mockDispatch = jest.fn();
      const spy = jest
        .spyOn(cartService, 'getItemsInCart')
        .mockImplementation(() => {
          throw error;
        });
      const expectedActions = [
        [{ type: FETCH_CART_ITEMS }],
        [{
          type: FETCH_CART_ITEMS_ERROR,
          error: error.toString()
        }],
      ];

      expect(spy).not.toHaveBeenCalled();

      await mockFetchCartItems(mockDispatch);

      expect(spy).toHaveBeenCalledTimes(1);
      expect(mockDispatch.mock.calls).toEqual(expectedActions);

      cartService.getItemsInCart.mockRestore();
    });
  });
});
