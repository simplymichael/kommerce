import { fromJS } from 'immutable';
import reducerRegistry from '../reducer-registry';
import { generateUniqueProductKey } from '../../utils/product';
import {
  FETCH_CART_ITEMS,
  FETCH_CART_ITEMS_ERROR,
  FETCH_CART_ITEMS_SUCCESS,

  ADD_PRODUCT_TO_CART,
  ADD_PRODUCT_TO_CART_ERROR,
  ADD_PRODUCT_TO_CART_SUCCESS,

  COUNT_CART_ITEMS,
  COUNT_CART_ITEMS_ERROR,
  COUNT_CART_ITEMS_SUCCESS,

  REMOVE_PRODUCT_FROM_CART,
  REMOVE_PRODUCT_FROM_CART_ERROR,
  REMOVE_PRODUCT_FROM_CART_SUCCESS,

  INCREASE_PRODUCT_QUANTITY_IN_CART_SUCCESS,
  DECREASE_PRODUCT_QUANTITY_IN_CART_SUCCESS,

  EMPTY_CART,
  EMPTY_CART_ERROR,
  EMPTY_CART_SUCCESS,

  FETCH_CART_PRICE,
  FETCH_CART_PRICE_ERROR,
  FETCH_CART_PRICE_SUCCESS,
} from './constants';

/*function uniqueProductKey(product) {
  const { id, color, size } = product;
  return `product_${id}_${color}_${size}`;
}*/
const uniqueProductKey = generateUniqueProductKey;

/**
 * Remove a product from an immutableList
 * @param: object with members:
 *   - product object with properties: id, color, size
 *   - state redux state object, as an immutableMap
 *   - list string the name of the list
 *     available lists in our state object are:
 *     items, addProductToCartList, removeProductFromCartList
 *
 * @return object the state object, which is an immutableMap
 */
function removeProductFromList({ state, list, product }) {
  const targetProduct = product;
  return state.update(list, immutableList =>
    immutableList.filter(product =>
      uniqueProductKey(product.toJS()) !== uniqueProductKey(targetProduct)));
}

export const reducerName = 'cart';
export const initialState = fromJS({
  items: [],
  fetchCartItemsError: null,
  isFetchingCartItems: false,

  itemsCount: 0,
  countCartItemsError: null,
  isCountingCartItems: false,

  addProductToCartError: null,

  // Products that are currently being added to the cart.
  // They are removed from this list once successfully added to the cart
  addProductToCartList: [],

  removeProductFromCartError: null,

  // Products that are currently being removed from the cart.
  // They are removed from this list once successfully removed from the cart
  removeProductFromCartList: [],

  isEmptyingCart: false,
  emptyCartError: null,

  isFetchingCartPrice: false,
  fetchCartPriceError: null,
  cartPriceData: {
    grandTotal: '0.00',
    subTotal: '0.00',
  },
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_CART_ITEMS:
    return state
      .set('fetchCartItemsError', null)
      .set('isFetchingCartItems', true);

  case FETCH_CART_ITEMS_ERROR:
    return state
      .set('fetchCartItemsError', action.error)
      .set('isFetchingCartItems', false);

  case FETCH_CART_ITEMS_SUCCESS:
    return state
      .set('fetchCartItemsError', null)
      .set('isFetchingCartItems', false)
      .set('items', fromJS(action.payload.items));

  case ADD_PRODUCT_TO_CART:
    return state
      .set('addProductToCartError', null)
      .update('addProductToCartList', immutableList => immutableList.concat(
        fromJS([{
          ...action.payload.product,
          color: action.payload.color,
          size: action.payload.size
        }])
      ));

  case ADD_PRODUCT_TO_CART_ERROR:
    return removeProductFromList({
      state,
      list: 'addProductToCartList',
      product: action.payload.product,
    }).set('addProductToCartError', action.error);

  case ADD_PRODUCT_TO_CART_SUCCESS:
    return removeProductFromList({
      state,
      list: 'addProductToCartList',
      product: action.payload.product,
    }).set('addProductToCartError', null)
      .update('itemsCount', count =>
        count + (action.payload.quantity || 1))
      .update('items', immutableList => immutableList.concat(
        action.payload.product));

  case COUNT_CART_ITEMS:
    return state
      .set('countCartItemsError', null)
      .set('isCountingCartItems', true);

  case COUNT_CART_ITEMS_ERROR:
    return state
      .set('countCartItemsError', action.error)
      .set('isCountingCartItems', false);

  case COUNT_CART_ITEMS_SUCCESS:
    return state
      .set('countCartItemsError', null)
      .set('isCountingCartItems', false)
      .set('itemsCount', action.payload.count);

  case REMOVE_PRODUCT_FROM_CART:
    return state
      .set('removeProductFromCartError', null)
      .update('removeProductFromCartList', immutableList =>
        immutableList.concat(fromJS(action.payload.product))
      );

  case REMOVE_PRODUCT_FROM_CART_ERROR:
    return removeProductFromList({
      state,
      list: 'removeProductFromCartList',
      product: action.payload.product,
    }).set('removeProductFromCartError', action.error);

  case REMOVE_PRODUCT_FROM_CART_SUCCESS:
    return removeProductFromList({
      state,
      list: 'removeProductFromCartList',
      product: action.payload.product,
    }).set('removeProductFromCartError', null)
      .update('itemsCount', count =>
        (count < 1 ? count : count - (action.payload.product.quantity || 1)))
      .update('items', immutableList => immutableList.filter(product =>
        uniqueProductKey(product.toJS()) !== uniqueProductKey(
          action.payload.product)));
    // This last .update() functionality above is what I've generalized
    // into the removeProductFromList(object) function,
    // but I've deliberately not replaced this implementation with a call to the function.
    //
    // product.get('id') !== removedProduct.id
    // fails when we have same product ID, but different color and/or size.
    // Fix that with the use of the uniqueProductKey(product) function

  case INCREASE_PRODUCT_QUANTITY_IN_CART_SUCCESS:
    return state
      .update('itemsCount', count => count + action.payload.incrementAmount)
      .updateIn(
        [
          'items',
          // get the index of the item (in the cart) to update
          state.get('items').findIndex(product =>
            // product.get('id') === action.payload.product.id);
            // fails when we have same product ID, but different color and/or size
            uniqueProductKey(product.toJS()) === uniqueProductKey(
              action.payload.product)),
          'quantity'
        ],
        quantity => quantity + action.payload.incrementAmount
      );

  case DECREASE_PRODUCT_QUANTITY_IN_CART_SUCCESS:
    return state
      .update('itemsCount', count => count - action.payload.decrementAmount)
      .updateIn(
        [
          'items',
          state.get('items').findIndex(product => uniqueProductKey(
            product.toJS()) === uniqueProductKey(action.payload.product)),
          'quantity'
        ],
        quantity => quantity - action.payload.decrementAmount
      );

  case EMPTY_CART:
    return state
      .set('isEmptyingCart', true)
      .set('emptyCartError', null);

  case EMPTY_CART_ERROR:
    return state
      .set('isEmptyingCart', false)
      .set('emptyCartError', action.error);

  case EMPTY_CART_SUCCESS:
    return state
      .set('isEmptyingCart', false)
      .set('emptyCartError', null)
      .set('itemsCount', 0)
      .set('items', fromJS([]));

  case FETCH_CART_PRICE:
    return state
      .set('isFetchingCartPrice', true)
      .set('fetchCartPriceError', null);

  case FETCH_CART_PRICE_ERROR:
    return state
      .set('isFetchingCartPrice', false)
      .set('fetchCartPriceError', action.error);

  case FETCH_CART_PRICE_SUCCESS:
    return state
      .set('isFetchingCartPrice', false)
      .set('fetchCartPriceError', null)
      .set('cartPriceData', fromJS(action.payload));

  default: return state;
  }
}

reducerRegistry.register(reducerName, reducer);
