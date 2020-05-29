import { all, call, put, takeEvery } from 'redux-saga/effects';
import sagaRegistry from '../saga-registry';
import { ADD_PRODUCT_REVIEW, FETCH_PRODUCT_REVIEWS } from './constants';
import {
  addProductReviewError,
  addProductReviewSuccess,
  fetchProductReviewsError,
  fetchProductReviewsSuccess,
} from './actions';

let service = null;

function* addProductReview(action) {
  try {
    const { payload: { productId, authorName, reviewText, rating } } = action;

    yield call(() => service.addProductReview(productId, {
      authorName,
      reviewText,
      rating,
    }));

    yield put(addProductReviewSuccess());
  } catch(err) {
    yield put(addProductReviewError(err.toString()));
  }
}

function* fetchProductReviews(action) {
  try {
    const { productId } = action.payload;
    const reviews = yield call(() => service.getProductReviews(productId));

    yield put(fetchProductReviewsSuccess(reviews));
  } catch(err) {
    yield put(fetchProductReviewsError(err.toString()));
  }
}

export const sagaName = 'product-reviews';
export default function(injectedService) {
  service = injectedService;

  function* watcher() {
    yield all([
      takeEvery(ADD_PRODUCT_REVIEW, addProductReview),
      takeEvery(FETCH_PRODUCT_REVIEWS, fetchProductReviews),
    ]);
  }

  sagaRegistry.register(sagaName, watcher);
}
