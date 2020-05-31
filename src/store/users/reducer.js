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
  isLoggingIn: false,
  loginError: null,
  isCreatingUser: false,
  createUserError: null,
  authSuccessData: {
    user: null,
    accessToken: '',
    expiresIn: 0,
  }
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
      .set('authSuccessData', action.payload.data);

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
      .set('authSuccessData', action.payload.data);

  default: return state;
  }
}

reducerRegistry.register(reducerName, reducer);
