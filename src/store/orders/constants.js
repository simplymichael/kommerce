import { generateActionName } from '../utils';

const NS = 'Order';
export const PROCESS_ORDER = generateActionName('PROCESS_ORDER', NS);
export const PROCESS_ORDER_ERROR = generateActionName('PROCESS_ORDER_ERROR', NS);
export const PROCESS_ORDER_SUCCESS = generateActionName(
  'PROCESS_ORDER_SUCCESS', NS);
