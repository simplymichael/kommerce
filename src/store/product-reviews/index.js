import sagas from './sagas';
import reducer from './reducer';
import { fetchProductReviews } from './actions';
import {
  makeSelectProductReviews,
  makeSelectIsAddingProductReview,
  makeSelectAddProductReviewError,
  makeSelectIsFetchingProductReviews,
  makeSelectFetchProductReviewsError,
} from './selectors';

export {
  sagas,
  reducer,

  fetchProductReviews,
  makeSelectProductReviews,
  makeSelectIsAddingProductReview,
  makeSelectAddProductReviewError,
  makeSelectIsFetchingProductReviews,
  makeSelectFetchProductReviewsError,
};
