import { all, call, put, takeEvery } from 'redux-saga/effects';
import { saveAuthToken } from '../../utils/auth';
import sagaRegistry from '../saga-registry';
import { LOGIN, CREATE_USER } from './constants';
import {
  loginUserError,
  loginUserSuccess,
  createUserError,
  createUserSuccess,
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

    saveAuthToken({
      token: accessToken,
      expires: expiresIn,
    });

    yield put(createUserSuccess(user));
  } catch (err) {
    yield put(createUserError(err.toString()));
  }
}

export const sagaName = 'auth';
export default function(injectedService) {
  service = injectedService;

  function* watcher() {
    yield all([
      takeEvery(LOGIN, login),
      takeEvery(CREATE_USER, createUser),
    ]);
  }

  sagaRegistry.register(sagaName, watcher);
}
