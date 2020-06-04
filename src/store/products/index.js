import sagas from './sagas';
import reducer from './reducer';
import {
  fetchProducts,
  fetchRecentProducts,
  searchProducts,
  clearSearch,
  countProducts,
} from './actions';
import {
  makeSelectProducts,
  makeSelectIsFetchingProducts,
  makeSelectFetchProductsError,

  makeSelectRecentProducts,
  makeSelectIsFetchingRecentProducts,
  makeSelectFetchRecentProductsError,

  makeSelectSearchTerm,
  makeSelectIsSearchingProducts,
  makeSelectSearchProductsError,

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

  searchProducts,
  makeSelectSearchTerm,
  makeSelectIsSearchingProducts,
  makeSelectSearchProductsError,

  clearSearch,

  countProducts,
  makeSelectProductsCount,
  makeSelectIsCountingProducts,
  makeSelectCountProductsError,
};
