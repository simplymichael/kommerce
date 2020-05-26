import { createSelector } from 'reselect';
import { initialState, reducerName } from './reducer';

export const localState = state => state.get(reducerName, initialState);

export const makeSelectProducts = () =>
  createSelector(localState, state => state.get('products').toJS());

export const makeSelectLatestProducts = () =>
  createSelector(localState, state => state.get('latestProducts').toJS());

export const makeSelectFetchProductsError = () =>
  createSelector(localState, state => state.get('fetchProductsError'));

export const makeSelectFetchLatestProductsError = () =>
  createSelector(localState, state => state.get('fetchLatestProductsError'));

export const makeSelectIsFetchingProducts = () =>
  createSelector(localState, state => state.get('isFetchingProducts'));

export const makeSelectIsFetchingLatestProducts = () =>
  createSelector(localState, state => state.get('isFetchingLatestProducts'));
