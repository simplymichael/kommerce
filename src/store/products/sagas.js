import { all, call, put, takeEvery } from 'redux-saga/effects';
import sagaRegistry from '../saga-registry';
import { FETCH_PRODUCTS, FETCH_LATEST_PRODUCTS } from './constants';
import {
  fetchProductsError,
  fetchProductsSuccess,
  fetchLatestProductsError,
  fetchLatestProductsSuccess,
} from './actions';

let service = null;

function* fetchProducts(action) {
  try {
    const { page, limit, color, size, brands, orderBy, priceRange } = action.payload;
    const products = yield call(() => service.getProducts({
      page, limit,color, size, brands, orderBy, priceRange}));

    yield put(fetchProductsSuccess(products));
  } catch (err) {
    yield put(fetchProductsError(err.toString()));
  }
}

function* fetchLatestProducts(action) {
  try {
    const { count } = action.payload;
    const products = yield call(service.getLatestProducts, count);

    yield put(fetchLatestProductsSuccess(products));
  } catch (err) {
    yield put(fetchLatestProductsError(err.toString()));
  }
}

export const sagaName = 'products';
export default function(injectedService) {
  service = injectedService;

  function* watcher() {
    yield all([
      takeEvery(FETCH_PRODUCTS, fetchProducts),
      takeEvery(FETCH_LATEST_PRODUCTS, fetchLatestProducts),
    ]);
  }

  sagaRegistry.register(sagaName, watcher);
}
