import { createSelector } from 'reselect';
import { initialState, reducerName } from './reducer';

export const localState = state => state.get(reducerName, initialState);

export const makeSelectIsFetchingSizes = () =>
  createSelector(localState, state => state.get('isFetchingSizes'));

export const makeSelectFetchSizesError = () =>
  createSelector(localState, state => state.get('fetchSizesError'));

export const makeSelectSizes = () =>
  createSelector(localState, state => state.get('sizes').toJS());

export const makeSelectSelectedSizes = () =>
  createSelector(localState, state => state.get('selectedSizes').toJS());
