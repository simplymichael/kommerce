import { createSelector } from 'reselect';
import { initialState, reducerName } from './reducer';

export const localState = state => state.get(reducerName, initialState);

export const makeSelectIsFetchingCategories = () =>
  createSelector(localState, state => state.get('isFetchingCategories'));

export const makeSelectFetchCategoriesError = () =>
  createSelector(localState, state => state.get('fetchCategoriesError'));

export const makeSelectCategories = () =>
  createSelector(localState, state => state.get('categories').toJS());
