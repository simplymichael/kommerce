import { fromJS } from 'immutable';
import reducerRegistry from '../reducer-registry';
import {
  FETCH_PRODUCT_DETAILS,
  FETCH_PRODUCT_DETAILS_ERROR,
  FETCH_PRODUCT_DETAILS_SUCCESS,

  FETCH_RELATED_PRODUCTS,
  FETCH_RELATED_PRODUCTS_ERROR,
  FETCH_RELATED_PRODUCTS_SUCCESS,
} from './constants';


export const reducerName = 'productDetails';
export const initialState = fromJS({
  productDetails: {},
  relatedProducts: [],
  isFetchingProductDetails: false,
  isFetchingRelatedProducts: false,
  fetchProductDetailsError: null,
  fetchRelatedProductsError: null,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_PRODUCT_DETAILS:
    return state
      .set('fetchProductDetailsError', null)
      .set('isFetchingProductDetails', true);

  case FETCH_PRODUCT_DETAILS_ERROR:
    return state
      .set('fetchProductDetailsError', action.error)
      .set('isFetchingProductDetails', false);

  case FETCH_PRODUCT_DETAILS_SUCCESS:
    return state
      .set('fetchProductDetailsError', null)
      .set('isFetchingProductDetails', false)
      .set('productDetails', fromJS(action.payload.productDetails));

  case FETCH_RELATED_PRODUCTS:
    return state
      .set('fetchRelatedProductsError', null)
      .set('isFetchingRelatedProducts', true);

  case FETCH_RELATED_PRODUCTS_ERROR:
    return state
      .set('fetchRelatedProductsError', action.error)
      .set('isFetchingRelatedProducts', false);

  case FETCH_RELATED_PRODUCTS_SUCCESS:
    return state
      .set('fetchRelatedProductsError', null)
      .set('isFetchingRelatedProducts', false)
      .set('relatedProducts', fromJS(action.payload.products));

  default: return state;
  }
}

reducerRegistry.register(reducerName, reducer);
