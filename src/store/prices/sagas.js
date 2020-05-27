import { all, put, takeEvery } from 'redux-saga/effects';
import sagaRegistry from '../saga-registry';
import { PRICE_RANGE_ADJUSTED } from './constants';
import { activateAdjustedPriceRange } from './actions';

function* onAdjustPriceRange(action) {
  try {
    const { range } = action.payload;
    yield put(activateAdjustedPriceRange(range));
  } catch(err) {
    console.error(err);
  }
}

export const sagaName = 'prices';
export default function() {
  function* watcher() {
    yield all([
      takeEvery(PRICE_RANGE_ADJUSTED, onAdjustPriceRange),
    ]);
  }

  sagaRegistry.register(sagaName, watcher);
}
