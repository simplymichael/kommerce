import { generateAction, generateErrorAction } from '../utils';
import {
  FETCH_COLORS,
  FETCH_COLORS_ERROR,
  FETCH_COLORS_SUCCESS,
  COLOR_CLICKED,
  SELECT_COLOR,
  DESELECT_COLOR,
} from './constants';

export function fetchColors() {
  return generateAction(FETCH_COLORS);
}

export function fetchColorsError(error) {
  return generateErrorAction(FETCH_COLORS_ERROR, error);
}

export function fetchColorsSuccess(colors) {
  return generateAction(FETCH_COLORS_SUCCESS, { colors });
}

export function onColorClick(color, select) {
  return generateAction(COLOR_CLICKED, { color, select });
}

export function selectColor(color) {
  return generateAction(SELECT_COLOR, { color });
}

export function deselectColor(color) {
  return generateAction(DESELECT_COLOR, { color });
}
