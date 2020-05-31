import { createSelector } from 'reselect';
import { initialState, reducerName } from './reducer';

export const localState = state => state.get(reducerName, initialState);

export const makeSelectIsLoggingIn = () =>
  createSelector(localState, state => state.get('isLoggingIn'));

export const makeSelectLoginError = () =>
  createSelector(localState, state => state.get('loginError'));

export const makeSelectIsCreatingUser = () =>
  createSelector(localState, state => state.get('isCreatingUser'));

export const makeSelectCreateUserError = () =>
  createSelector(localState, state => state.get('createUserError'));

export const makeSelectAuthSuccessData = () =>
  createSelector(localState, state => state.get('authSuccessData').toJS());
