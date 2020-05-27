import { createSelector } from 'reselect';
import { initialState, reducerName } from './reducer';

export const localState = state => state.get(reducerName, initialState);

export const makeSelectProductDetails = () =>
  createSelector(localState, state => state.get('productDetails').toJS());

export const makeSelectFetchProductDetailsError = () =>
  createSelector(localState, state => state.get('fetchProductDetailsError'));

export const makeSelectIsFetchingProductDetails = () =>
  createSelector(localState, state => state.get('isFetchingProductDetails'));

export const makeSelectRelatedProducts = () =>
  createSelector(localState, state => state.get('relatedProducts').toJS());

export const makeSelectFetchRelatedProductsError = () =>
  createSelector(localState, state => state.get('fetchRelatedProductsError'));

export const makeSelectIsFetchingRelatedProducts = () =>
  createSelector(localState, state => state.get('isFetchingRelatedProducts'));
