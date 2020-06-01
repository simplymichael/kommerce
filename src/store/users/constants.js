import { generateActionName } from '../utils';

const NS = 'Auth';

export const LOGIN = generateActionName('LOGIN', NS);
export const LOGIN_ERROR = generateActionName('LOGIN_ERROR', NS);
export const LOGIN_SUCCESS = generateActionName('LOGIN_SUCCESS', NS);

export const CREATE_USER = generateActionName('CREATE_USER', NS);
export const CREATE_USER_ERROR = generateActionName('CREATE_USER_ERROR', NS);
export const CREATE_USER_SUCCESS = generateActionName('CREATE_USER_SUCCESS', NS);

export const FETCH_CURRENT_USER = generateActionName('FETCH_CURRENT_USER', NS);
export const FETCH_CURRENT_USER_ERROR = generateActionName(
  'FETCH_CURRENT_USER_ERROR', NS);
export const FETCH_CURRENT_USER_SUCCESS = generateActionName(
  'FETCH_CURRENT_USER_SUCCESS', NS);
