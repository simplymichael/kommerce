import { all, call, put, takeEvery } from 'redux-saga/effects';
import sagaRegistry from '../saga-registry';
import { FETCH_PRODUCTS, FETCH_RECENT_PRODUCTS } from './constants';
import {
  fetchProductsError,
  fetchProductsSuccess,
  fetchRecentProductsError,
  fetchRecentProductsSuccess,
} from './actions';

let service = null;

function* fetchProducts(action) {
  try {
    const products = yield call(() => service.getProducts(action.payload));

    yield put(fetchProductsSuccess(products));
  } catch (err) {
    yield put(fetchProductsError(err.toString()));
  }
}

function* fetchRecentProducts(action) {
  try {
    const products = yield call(() => service.getProducts(action.payload));

    yield put(fetchRecentProductsSuccess(products));
  } catch (err) {
    yield put(fetchRecentProductsError(err.toString()));
  }
}

export const sagaName = 'products';
export default function(injectedService) {
  service = injectedService;

  function* watcher() {
    yield all([
      takeEvery(FETCH_PRODUCTS, fetchProducts),
      takeEvery(FETCH_RECENT_PRODUCTS, fetchRecentProducts),
    ]);
  }

  sagaRegistry.register(sagaName, watcher);
}
