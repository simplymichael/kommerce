import { all, call, put, takeEvery } from 'redux-saga/effects';
import sagaRegistry from '../saga-registry';
import { FETCH_BRANDS, BRAND_CLICKED } from './constants';
import {
  fetchBrandsError,
  fetchBrandsSuccess,
  selectBrand,
  deselectBrand,
} from './actions';


let service = null;

function* fetchBrands() {
  try {
    const brands = yield call(() => service.getBrands());

    yield put(fetchBrandsSuccess(brands));
  } catch (err) {
    yield put(fetchBrandsError(err.toString()));
  }
}

function* onBrandClick(action) {
  try {
    const { brand, checked  } = action.payload;

    if(checked) {
      yield put(selectBrand(brand));
    } else {
      yield put(deselectBrand(brand));
    }
  } catch(err) {
    console.error(err);
  }
}

export const sagaName = 'brands';
export default function (injectedService) {
  service = injectedService;

  function* watcher() {
    yield all([
      takeEvery(FETCH_BRANDS, fetchBrands),
      takeEvery(BRAND_CLICKED, onBrandClick),
    ]);
  }

  sagaRegistry.register(sagaName, watcher);
}
