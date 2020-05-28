import { fromJS } from 'immutable';
import reducerRegistry from '../reducer-registry';
import {
  PROCESS_ORDER,
  PROCESS_ORDER_ERROR,
  PROCESS_ORDER_SUCCESS
} from './constants';

export const reducerName = 'orders';
export const initialState = fromJS({
  orderId: 0,
  isProcessingOrder: false,
  processOrderError: null,
});


export default function reducer(state = initialState, action) {
  switch(action.type) {
  case PROCESS_ORDER:
    return state
      .set('orderId', 0)
      .set('isProcessingOrder', true)
      .set('processOrderError', null);

  case PROCESS_ORDER_ERROR:
    return state
      .set('orderId', 0)
      .set('isProcessingOrder', false)
      .set('processOrderError', action.error);

  case PROCESS_ORDER_SUCCESS:
    return state
      .set('orderId', action.payload.orderId)
      .set('isProcessingOrder', false)
      .set('processOrderError', null);

  default: return state;
  }
}

reducerRegistry.register(reducerName, reducer);
