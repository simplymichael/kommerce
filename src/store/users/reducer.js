import { fromJS } from 'immutable';
import reducerRegistry from '../reducer-registry';
import { clearCachedUser, deleteAccessToken } from '../../utils/auth';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,

  CREATE_USER,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,

  FETCH_CURRENT_USER,
  FETCH_CURRENT_USER_ERROR,
  FETCH_CURRENT_USER_SUCCESS,

  LOGOUT,
} from './constants';

export const reducerName = 'auth';
export const initialState = fromJS({
  user: {},
  isLoggingIn: false,
  loginError: null,
  isCreatingUser: false,
  createUserError: null,
  isFetchingCurrentUser: false,
  fetchCurrentUserError: null,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case LOGIN:
    return state
      .set('isLoggingIn', true)
      .set('loginError', null);

  case LOGIN_ERROR:
    return state
      .set('isLoggingIn', false)
      .set('loginError', action.error);

  case LOGIN_SUCCESS:
    return state
      .set('isLoggingIn', false)
      .set('loginError', null)
      .set('user', fromJS(action.payload.user));

  case CREATE_USER:
    return state
      .set('isCreatingUser', true)
      .set('createUserError', null);

  case CREATE_USER_ERROR:
    return state
      .set('isCreatingUser', false)
      .set('createUserError', action.error);

  case CREATE_USER_SUCCESS:
    return state
      .set('isCreatingUser', false)
      .set('createUserError', null)
      .set('user', fromJS(action.payload.user));

  case FETCH_CURRENT_USER:
    return state
      .set('isFetchingCurrentUser', true)
      .set('fetchCurrentUserError', null);

  case FETCH_CURRENT_USER_ERROR:
    return state
      .set('isFetchingCurrentUser', false)
      .set('fetchCurrentUserError', action.error);

  case FETCH_CURRENT_USER_SUCCESS:
    return state
      .set('isFetchingCurrentUser', false)
      .set('fetchCurrentUserError', null)
      .set('user', fromJS(action.payload.user));

  case LOGOUT:
    clearCachedUser();
    deleteAccessToken();
    return state
      .set('user', fromJS({}));

  default: return state;
  }
}

reducerRegistry.register(reducerName, reducer);
