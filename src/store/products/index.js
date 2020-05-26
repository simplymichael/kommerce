import sagas from './sagas';
import reducer from './reducer';
import { fetchProducts } from './actions';
import {
  makeSelectProducts,
  makeSelectIsFetchingProducts,
  makeSelectFetchProductsError,
} from './selectors';

export {
  sagas,
  reducer,
  fetchProducts,
  makeSelectProducts,
  makeSelectIsFetchingProducts,
  makeSelectFetchProductsError,
};
