import sagas from './sagas';
import reducer from './reducer';
import { fetchProductDetails, fetchRelatedProducts } from './actions';
import {
  makeSelectProductDetails,
  makeSelectIsFetchingProductDetails,
  makeSelectFetchProductDetailsError,

  makeSelectRelatedProducts,
  makeSelectIsFetchingRelatedProducts,
  makeSelectFetchRelatedProductsError,
} from './selectors';

export {
  sagas,
  reducer,

  fetchProductDetails,
  makeSelectProductDetails,
  makeSelectIsFetchingProductDetails,
  makeSelectFetchProductDetailsError,

  fetchRelatedProducts,
  makeSelectRelatedProducts,
  makeSelectIsFetchingRelatedProducts,
  makeSelectFetchRelatedProductsError,
};
