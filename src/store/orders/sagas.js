import { put, call, takeEvery } from 'redux-saga/effects';
import sagaRegistry from '../saga-registry';
import { PROCESS_ORDER } from './constants';
import { processOrderError, processOrderSuccess } from './actions';

let service = null;

function* processOrder(action) {
  const { orderData } = action.payload;

  try {
    const orderId = yield call(() => service.placeOrder(orderData));

    yield put(processOrderSuccess(orderId));
  } catch(err) {
    yield put(processOrderError(err.toString()));
  }
}

export const sagaName = 'orders';
export default function(injectedService) {
  service = injectedService;

  function* watcher() {
    yield takeEvery(PROCESS_ORDER, processOrder);
  }

  sagaRegistry.register(sagaName, watcher);
}
