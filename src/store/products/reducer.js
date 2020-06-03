import { fromJS } from 'immutable';
import reducerRegistry from '../reducer-registry';
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS,

  FETCH_RECENT_PRODUCTS,
  FETCH_RECENT_PRODUCTS_ERROR,
  FETCH_RECENT_PRODUCTS_SUCCESS,

  SEARCH_PRODUCTS,
  SEARCH_PRODUCTS_ERROR,
  SEARCH_PRODUCTS_SUCCESS,

  CLEAR_SEARCH,
} from './constants';

export const reducerName = 'products';
export const initialState = fromJS({
  products: [],
  isFetchingProducts: false,
  fetchProductsError: null,

  recentProducts: [],
  isFetchingRecentProducts: false,
  fetchRecentProductsError: null,

  searchTerm: '',
  isSearchingProducts: false,
  searchProductsError: null,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_PRODUCTS:
    return state
      .set('fetchProductsError', null)
      .set('isFetchingProducts', true);

  case FETCH_PRODUCTS_ERROR:
    return state
      .set('fetchProductsError', action.error)
      .set('isFetchingProducts', false);

  case FETCH_PRODUCTS_SUCCESS:
    return state
      .set('fetchProductsError', null)
      .set('isFetchingProducts', false)
      .set('products', fromJS(action.payload.products));

  case FETCH_RECENT_PRODUCTS:
    return state
      .set('fetchRecentProductsError', null)
      .set('isFetchingRecentProducts', true);

  case FETCH_RECENT_PRODUCTS_ERROR:
    return state
      .set('fetchRecentProductsError', action.error)
      .set('isFetchingRecentProducts', false);

  case FETCH_RECENT_PRODUCTS_SUCCESS:
    return state
      .set('fetchRecentProductsError', null)
      .set('isFetchingRecentProducts', false)
      .set('recentProducts', fromJS(action.payload.products));

  case SEARCH_PRODUCTS: 
    return state
      .set('searchTerm', action.payload.query)
      .set('isSearchingProducts', true)
      .set('searchProductsError', null);

  case SEARCH_PRODUCTS_ERROR:
    return state
      .set('isSearchingProducts', false)
      .set('searchProductsError', action.error);

  case SEARCH_PRODUCTS_SUCCESS:
    return state
      .set('isSearchingProducts', false)
      .set('searchProductsError', null)
      .set('products', fromJS(action.payload.products));

  case CLEAR_SEARCH:
    return state
      .set('searchTerm', '')
      .set('isSearchingProducts', false)
      .set('searchProductsError', null);

  default: return state;
  }
}

reducerRegistry.register(reducerName, reducer);
