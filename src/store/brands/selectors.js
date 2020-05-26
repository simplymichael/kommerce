import { createSelector } from 'reselect';
import { initialState, reducerName } from './reducer';

export const localState = state => state.get(reducerName, initialState);

export const makeSelectIsFetchingBrands = () =>
  createSelector(localState, state => state.get('isFetchingBrands'));

export const makeSelectFetchBrandsError = () =>
  createSelector(localState, state => state.get('FetchBrandsError'));

export const makeSelectBrands = () =>
  createSelector(localState, state => state.get('brands').toJS());

export const makeSelectSelectedBrands = () =>
  createSelector(localState, state => state.get('selectedBrands').toJS());
