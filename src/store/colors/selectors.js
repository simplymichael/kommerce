import { createSelector } from 'reselect';
import { initialState, reducerName } from './reducer';

export const localState = state => state.get(reducerName, initialState);

export const makeSelectIsFetchingColors = () =>
  createSelector(localState, state => state.get('isFetchingColors'));

export const makeSelectFetchColorsError = () =>
  createSelector(localState, state => state.get('fetchColorsError'));

export const makeSelectColors = () =>
  createSelector(localState, state => state.get('colors').toJS());

export const makeSelectSelectedColors = () =>
  createSelector(localState, state => state.get('selectedColors').toJS());
