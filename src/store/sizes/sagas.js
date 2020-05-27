import { all, call, put, takeEvery } from 'redux-saga/effects';
import sagaRegistry from '../saga-registry';
import { FETCH_SIZES, SIZE_CLICKED } from './constants';
import {
  fetchSizesError,
  fetchSizesSuccess,
  selectSize,
  deselectSize,
} from './actions';

let service = null;

function* fetchSizes() {
  try {
    const sizes = yield call(() => service.getSizes());

    yield put(fetchSizesSuccess(sizes));
  } catch (err) {
    yield put(fetchSizesError(err.toString()));
  }
}

function* onSizeClick(action) {
  try {
    const { size, select } = action.payload;

    if(select) {
      yield put(selectSize(size));
    } else {
      yield put(deselectSize(size));
    }
  } catch(err) {
    console.log(err);
  }
}

export const sagaName = 'sizes';
export default function(injectedService) {
  service = injectedService;

  function* watcher() {
    yield all([
      takeEvery(FETCH_SIZES, fetchSizes),
      takeEvery(SIZE_CLICKED, onSizeClick),
    ]);
  }

  sagaRegistry.register(sagaName, watcher);
}
