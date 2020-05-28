import { generateAction, generateErrorAction } from '../utils';
import {
  PROCESS_ORDER,
  PROCESS_ORDER_ERROR,
  PROCESS_ORDER_SUCCESS,
} from './constants';


export function processOrder(orderData) {
  return generateAction( PROCESS_ORDER, { orderData });
}

export function processOrderError(error) {
  return generateErrorAction(PROCESS_ORDER_ERROR, error);
}

export function processOrderSuccess(orderId) {
  return generateAction(PROCESS_ORDER_SUCCESS, { orderId });
}
