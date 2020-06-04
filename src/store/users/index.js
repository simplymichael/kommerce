import sagas from './sagas';
import reducer from './reducer';
import {
  loginUser,
  createUser,
  fetchCurrentUser,
  logout,
} from './actions';
import {
  makeSelectUser,
  makeSelectIsLoggingIn,
  makeSelectIsCreatingUser,
  makeSelectIsFetchingCurrentUser,
  makeSelectLoginError,
  makeSelectCreateUserError,
  makeSelectFetchCurrentUserError,
} from './selectors';

export {
  sagas,
  reducer,
  loginUser,
  createUser,
  fetchCurrentUser,
  makeSelectUser,
  makeSelectIsLoggingIn,
  makeSelectIsCreatingUser,
  makeSelectIsFetchingCurrentUser,
  makeSelectLoginError,
  makeSelectCreateUserError,
  makeSelectFetchCurrentUserError,
  logout,
};
