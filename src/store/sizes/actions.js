import { generateAction, generateErrorAction } from '../utils';
import {
  FETCH_SIZES,
  FETCH_SIZES_ERROR,
  FETCH_SIZES_SUCCESS,
  SIZE_CLICKED,
  SELECT_SIZE,
  DESELECT_SIZE,
} from './constants';

export function fetchSizes() {
  return generateAction(FETCH_SIZES);
}

export function fetchSizesError(error) {
  return generateErrorAction(FETCH_SIZES_ERROR, error);
}

export function fetchSizesSuccess(sizes) {
  return generateAction(FETCH_SIZES_SUCCESS, { sizes });
}

export function onSizeClick(size, select) {
  return generateAction(SIZE_CLICKED, { size, select });
}

export function selectSize(size) {
  return generateAction(SELECT_SIZE, { size });
}

export function deselectSize(size) {
  return generateAction(DESELECT_SIZE, { size });
}
