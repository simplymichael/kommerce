import reducer from './reducer';
import sagas from './sagas';
import { fetchProducts, fetchLatestProducts } from './actions';
import {
  makeSelectFetchProductsError,
  makeSelectFetchLatestProductsError,
  makeSelectProducts,
  makeSelectLatestProducts,
  makeSelectIsFetchingProducts,
  makeSelectIsFetchingLatestProducts,
} from './selectors';

export {
  reducer,
  sagas,
  fetchProducts,
  fetchLatestProducts,
  makeSelectFetchProductsError,
  makeSelectFetchLatestProductsError,
  makeSelectProducts,
  makeSelectLatestProducts,
  makeSelectIsFetchingProducts,
  makeSelectIsFetchingLatestProducts,
};
