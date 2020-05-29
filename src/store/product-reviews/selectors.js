import { createSelector } from 'reselect';
import { initialState, reducerName } from './reducer';

export const localState = state => state.get(reducerName, initialState);

export const makeSelectIsAddingProductReview = () =>
  createSelector(localState, state => state.get('isAddingProductReview'));

export const makeSelectAddProductReviewError = () =>
  createSelector(localState, state => state.get('addProductReviewError'));

export const makeSelectIsFetchingProductReviews = () =>
  createSelector(localState, state => state.get('isFetchingProductReviews'));

export const makeSelectFetchProductReviewsError = () =>
  createSelector(localState, state => state.get('fetchProductReviewsError'));

export const makeSelectProductReviews = () =>
  createSelector(localState, state => state.get('productReviews').toJS());
