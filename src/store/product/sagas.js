import { all, call, put, takeEvery } from 'redux-saga/effects';
import sagaRegistry from '../saga-registry';
import { FETCH_PRODUCT_DETAILS, FETCH_RELATED_PRODUCTS } from './constants';
import {
  fetchProductDetailsError,
  fetchProductDetailsSuccess,
  fetchRelatedProductsError,
  fetchRelatedProductsSuccess,
} from './actions';

let service = null;

function* fetchProductDetails(action) {
  try {
    const { productId } = action.payload;
    const productDetails = yield call(() => service.getProduct(productId));

    yield put(fetchProductDetailsSuccess(productDetails));
  } catch(err) {
    yield put(fetchProductDetailsError(err.toString()));
  }
}

function* fetchRelatedProducts(action) {
  try {
    const { productId } = action.payload;
    const relatedProducts = yield call(() => service.getRelatedProducts(
      productId));

    yield put(fetchRelatedProductsSuccess(relatedProducts));
  } catch(err) {
    yield put(fetchRelatedProductsError(err.toString()));
  }
}

export const sagaName = 'product';
export default function(injectedService) {
  service = injectedService;

  function* watcher() {
    yield all([
      takeEvery(FETCH_PRODUCT_DETAILS, fetchProductDetails),
      takeEvery(FETCH_RELATED_PRODUCTS, fetchRelatedProducts),
    ]);
  }

  sagaRegistry.register(sagaName, watcher);
}
