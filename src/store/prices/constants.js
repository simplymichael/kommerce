import { generateActionName } from '../utils';

const NS = 'PriceRange';
export const PRICE_RANGE_ADJUSTED = generateActionName(
  'PRICE_RANGE_ADJUSTED', NS);
export const ACTIVATE_ADJUSTED_PRICE_RANGE = generateActionName(
  'ACTIVATE_ADJUSTED_PRICE_RANGE', NS);
