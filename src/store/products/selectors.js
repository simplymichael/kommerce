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

export const makeSelectSearchProductsError = () =>
  createSelector(localState, state => state.get('searchProductsError'));

export const makeSelectIsSearchingProducts = () =>
  createSelector(localState, state => state.get('isSearchingProducts'));

export const makeSelectSearchTerm = () =>
  createSelector(localState, state => state.get('searchTerm'));
