import { createSelector } from 'reselect';
import { initialState, reducerName } from './reducer';

export const localState = state => state.get(reducerName, initialState);

export const makeSelectProducts = () =>
  createSelector(localState, state => state.get('products').toJS());

export const makeSelectFetchProductsError = () =>
  createSelector(localState, state => state.get('fetchProductsError'));

export const makeSelectIsFetchingProducts = () =>
  createSelector(localState, state => state.get('isFetchingProducts'));

export const makeSelectRecentProducts = () =>
  createSelector(localState, state => state.get('recentProducts').toJS());

export const makeSelectFetchRecentProductsError = () =>
  createSelector(localState, state => state.get('fetchRecentProductsError'));

export const makeSelectIsFetchingRecentProducts = () =>
  createSelector(localState, state => state.get('isFetchingRecentProducts'));

export const makeSelectProductsCount = () =>
  createSelector(localState, state => state.get('productsCount'));

export const makeSelectIsCountingProducts = () =>
  createSelector(localState, state => state.get('isCountingProducts'));

export const makeSelectCountProductsError = () =>
  createSelector(localState, state => state.get('countProductsError'));
