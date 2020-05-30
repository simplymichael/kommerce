import { fromJS } from 'immutable';
import reducerRegistry from '../reducer-registry';
import {
  ADD_PRODUCT_REVIEW,
  ADD_PRODUCT_REVIEW_ERROR,
  ADD_PRODUCT_REVIEW_SUCCESS,

  FETCH_PRODUCT_REVIEWS,
  FETCH_PRODUCT_REVIEWS_ERROR,
  FETCH_PRODUCT_REVIEWS_SUCCESS,
} from './constants';

export const reducerName = 'productReviews';
export const initialState = fromJS({
  productReviews: [],
  isAddingProductReview: false,
  addProductReviewError: null,
  isFetchingProductReviews: false,
  fetchProductReviewsError: null,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case ADD_PRODUCT_REVIEW:
    return state
      .set('isAddingProductReview', true)
      .set('addProductReviewError', null);

  case ADD_PRODUCT_REVIEW_ERROR:
    return state
      .set('isAddingProductReview', false)
      .set('addProductReviewError', action.error);

  case ADD_PRODUCT_REVIEW_SUCCESS:
    return state
      .set('isAddingProductReview', false)
      .set('addProductReviewError', null)
      .update('productReviews', immutableList => immutableList.concat(
        [action.payload.review]));

  case FETCH_PRODUCT_REVIEWS:
    return state
      .set('isFetchingProductReviews', true)
      .set('fetchProductReviewsError', null);

  case FETCH_PRODUCT_REVIEWS_ERROR:
    return state
      .set('isFetchingProductReviews', false)
      .set('fetchProductReviewsError', action.error);

  case FETCH_PRODUCT_REVIEWS_SUCCESS:
    return state
      .set('isFetchingProductReviews', false)
      .set('fetchProductReviewsError', null)
      .set('productReviews', fromJS(action.payload.reviews));

  default: return state;
  }
}

reducerRegistry.register(reducerName, reducer);
