import { generateAction, generateErrorAction } from '../utils';
import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,

  CREATE_USER,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,

  FETCH_CURRENT_USER,
  FETCH_CURRENT_USER_ERROR,
  FETCH_CURRENT_USER_SUCCESS,

  LOGOUT,
} from './constants';

export function loginUser(user) {
  return generateAction(LOGIN, { user });
}

export function loginUserError(error) {
  return generateErrorAction(LOGIN_ERROR, error);
}

export function loginUserSuccess(user) {
  return generateAction(LOGIN_SUCCESS, { user });
}

export function createUser(user) {
  return generateAction(CREATE_USER, { user });
}

export function createUserError(error) {
  return generateErrorAction(CREATE_USER_ERROR, error);
}

export function createUserSuccess(user) {
  return generateAction(CREATE_USER_SUCCESS, { user });
}

export function fetchCurrentUser() {
  return generateAction(FETCH_CURRENT_USER);
}

export function fetchCurrentUserError(error) {
  return generateErrorAction(FETCH_CURRENT_USER_ERROR, error);
}

export function fetchCurrentUserSuccess(user) {
  return generateAction(FETCH_CURRENT_USER_SUCCESS, { user });
}

export function logout() {
  return generateAction(LOGOUT);
}
