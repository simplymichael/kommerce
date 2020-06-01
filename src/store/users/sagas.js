import { all, call, put, takeEvery } from 'redux-saga/effects';
import { cacheUser, saveAuthToken } from '../../utils/auth';
import sagaRegistry from '../saga-registry';
import { LOGIN, CREATE_USER, FETCH_CURRENT_USER } from './constants';
import {
  loginUserError,
  loginUserSuccess,
  createUserError,
  createUserSuccess,
  fetchCurrentUserError,
  fetchCurrentUserSuccess,
} from './actions';

let service = null;

function* login(action) {
  const { user: loginData } = action.payload;

  try {
    const {
      user,
      accessToken,
      expiresIn
    } = yield call(() => service.loginUser(loginData));

    cacheUser(user, expiresIn);
    saveAuthToken({
      token: accessToken,
      expires: expiresIn,
    });

    yield put(loginUserSuccess(user));
  } catch (err) {
    yield put(loginUserError(err.toString()));
  }
}

function* createUser(action) {
  const { user: registrationData } = action.payload;

  try {
    const {
      user,
      accessToken,
      expiresIn
    } = yield call(() => service.createUser(registrationData));

    cacheUser(user, expiresIn);
    saveAuthToken({
      token: accessToken,
      expires: expiresIn,
    });

    yield put(createUserSuccess(user));
  } catch (err) {
    yield put(createUserError(err.toString()));
  }
}

function* fetchCurrentUser() {
  try {
    const user = yield call(() => service.getCurrentUser());

    yield put(fetchCurrentUserSuccess(user));
  } catch (err) {
    yield put(fetchCurrentUserError(err.toString()));
  }
}

export const sagaName = 'auth';
export default function(injectedService) {
  service = injectedService;

  function* watcher() {
    yield all([
      takeEvery(LOGIN, login),
      takeEvery(CREATE_USER, createUser),
      takeEvery(FETCH_CURRENT_USER, fetchCurrentUser),
    ]);
  }

  sagaRegistry.register(sagaName, watcher);
}
