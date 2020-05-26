import { createSelector } from 'reselect';
import { initialState, reducerName } from './reducer';

export const localState = state => state.get(reducerName, initialState);

export const makeSelectProducts = () =>
  createSelector(localState, state => state.get('products').toJS());

export const makeSelectFetchProductsError = () =>
  createSelector(localState, state => state.get('fetchProductsError'));

export const makeSelectIsFetchingProducts = () =>
  createSelector(localState, state => state.get('isFetchingProducts'));
