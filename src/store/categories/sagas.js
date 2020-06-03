import { all, call, put, takeEvery } from 'redux-saga/effects';
import sagaRegistry from '../saga-registry';
import { FETCH_CATEGORIES } from './constants';
import { fetchCategoriesError, fetchCategoriesSuccess } from './actions';

let service = null;

function* fetchCategories() {
  try {
    const categories = yield call(() => service.getCategories());

    yield put(fetchCategoriesSuccess(categories));
  } catch (err) {
    yield put(fetchCategoriesError(err.toString()));
  }
}

export const sagaName = 'category';
export default function(injectedService) {
  service = injectedService;

  function* watcher() {
    yield all([
      takeEvery(FETCH_CATEGORIES, fetchCategories),
    ]);
  }

  sagaRegistry.register(sagaName, watcher);
}
