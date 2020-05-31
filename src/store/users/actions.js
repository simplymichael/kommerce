import { generateAction, generateErrorAction } from '../utils';
import {
  LOGIN,
  LOGIN_ERROR,
  LOGIN_SUCCESS,

  CREATE_USER,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
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
