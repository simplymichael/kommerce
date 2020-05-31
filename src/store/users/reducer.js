import { fromJS } from 'immutable';
import reducerRegistry from '../reducer-registry';
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,

  CREATE_USER,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
} from './constants';


export const reducerName = 'auth';
export const initialState = fromJS({
  user: {},
  isLoggingIn: false,
  loginError: null,
  isCreatingUser: false,
  createUserError: null,
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

  default: return state;
  }
}

reducerRegistry.register(reducerName, reducer);
