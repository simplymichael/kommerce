import { all, call, put, takeEvery } from 'redux-saga/effects';
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
  const { user } = action.payload;

  try {
    const data = yield call(() => service.loginUser(user));

    yield put(loginUserSuccess(data));
  } catch (err) {
    yield put(loginUserError(err.toString()));
  }
}

function* createUser(action) {
  const { user } = action.payload;

  try {
    const data = yield call(() => service.createUser(user));

    yield put(createUserSuccess(data));
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
