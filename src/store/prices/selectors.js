import { createSelector } from 'reselect';
import { initialState, reducerName } from './reducer';

export const localState = state => state.get(reducerName, initialState);

export const makeSelectPriceRange = () =>
  createSelector(localState, state => state.get('priceRange').toJS());
