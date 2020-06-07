import sagas from './sagas';
import reducer from './reducer';
import {
  fetchProducts,
  fetchRecentProducts,
  countProducts,
} from './actions';
import {
  makeSelectProducts,
  makeSelectIsFetchingProducts,
  makeSelectFetchProductsError,

  makeSelectRecentProducts,
  makeSelectIsFetchingRecentProducts,
  makeSelectFetchRecentProductsError,

  makeSelectProductsCount,
  makeSelectIsCountingProducts,
  makeSelectCountProductsError,
} from './selectors';

export {
  sagas,
  reducer,
  fetchProducts,
  makeSelectProducts,
  makeSelectIsFetchingProducts,
  makeSelectFetchProductsError,

  fetchRecentProducts,
  makeSelectRecentProducts,
  makeSelectIsFetchingRecentProducts,
  makeSelectFetchRecentProductsError,

  countProducts,
  makeSelectProductsCount,
  makeSelectIsCountingProducts,
  makeSelectCountProductsError,
};
