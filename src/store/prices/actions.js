import { generateAction } from '../utils';
import {
  PRICE_RANGE_ADJUSTED,
  ACTIVATE_ADJUSTED_PRICE_RANGE
} from './constants';

export function onAdjustPriceRange(range) {
  return generateAction(PRICE_RANGE_ADJUSTED, { range });
}

export function activateAdjustedPriceRange(newRange) {
  return generateAction(ACTIVATE_ADJUSTED_PRICE_RANGE, { newRange });
}
