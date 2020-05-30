import sagas from './sagas';
import reducer from './reducer';
import { fetchProducts, fetchRecentProducts } from './actions';
import {
  makeSelectProducts,
  makeSelectIsFetchingProducts,
  makeSelectFetchProductsError,

  makeSelectRecentProducts,
  makeSelectIsFetchingRecentProducts,
  makeSelectFetchRecentProductsError,
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
};
