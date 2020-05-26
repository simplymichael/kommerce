import { fromJS } from 'immutable';
import reducerRegistry from '../reducer-registry';
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_LATEST_PRODUCTS,
  FETCH_LATEST_PRODUCTS_ERROR,
  FETCH_LATEST_PRODUCTS_SUCCESS,
} from './constants';

export const reducerName = 'product';
export const initialState = fromJS({
  fetchProductsError: null,
  fetchLatestProductsError: null,
  isFetchingProducts: false,
  isFetchingLatestProducts: false,
  products: [],
  latestProducts: [],
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_PRODUCTS:
    return state
      .set('fetchProductsError', null)
      .set('isFetchingProducts', true);

  case FETCH_LATEST_PRODUCTS:
    return state
      .set('fetchLatestProductsError', null)
      .set('isFetchingLatestProducts', true);

  case FETCH_PRODUCTS_ERROR:
    return state
      .set('fetchProductsError', action.error)
      .set('isFetchingProducts', false);

  case FETCH_LATEST_PRODUCTS_ERROR:
    return state
      .set('fetchLatestProductsError', action.error)
      .set('isFetchingLatestProducts', false);

  case FETCH_PRODUCTS_SUCCESS:
    return state
      .set('fetchProductsError', null)
      .set('isFetchingProducts', false)
      .set('products', fromJS(action.payload.products));

  case FETCH_LATEST_PRODUCTS_SUCCESS:
    return state
      .set('fetchLatestProductsError', null)
      .set('isFetchingLatestProducts', false)
      .set('latestProducts', fromJS(action.payload.latestProducts));

  default: return state;
  }
}

reducerRegistry.register(reducerName, reducer);
