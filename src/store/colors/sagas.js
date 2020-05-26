import { all, call, put, takeEvery } from 'redux-saga/effects';
import sagaRegistry from '../saga-registry';
import { FETCH_COLORS, COLOR_CLICKED } from './constants';
import {
  fetchColorsError,
  fetchColorsSuccess,
  selectColor,
  deselectColor,
} from './actions';

let service = null;

function* fetchColors() {
  try {
    const colors = yield call(() => service.getColors());

    yield put(fetchColorsSuccess(colors));
  } catch (err) {
    yield put(fetchColorsError(err.toString()));
  }
}

function* onColorClick(action) {
  try {
    const { color, select } = action.payload;

    if(select) {
      yield put(selectColor(color));
    } else {
      yield put(deselectColor(color));
    }
  } catch(err) {
    console.error(err);
  }
}

export const sagaName = 'colors';
export default function(injectedService) {
  service = injectedService;

  function* watcher() {
    yield all([
      takeEvery(FETCH_COLORS, fetchColors),
      takeEvery(COLOR_CLICKED, onColorClick),
    ]);
  }

  sagaRegistry.register(sagaName, watcher);
}
