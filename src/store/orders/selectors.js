import { createSelector } from 'reselect';
import { initialState, reducerName } from './reducer';

export const localState = state => state.get(reducerName, initialState);

export const makeSelectOrderId = () =>
  createSelector(localState, state => state.get('orderId'));

export const makeSelectIsProcessingOrder = () =>
  createSelector(localState, state => state.get('isProcessingOrder'));

export const makeSelectProcessOrderError = () =>
  createSelector(localState, state => state.get('processOrderError'));
