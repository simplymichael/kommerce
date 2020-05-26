import { generateActionName } from '../utils';

const NS = 'Colors';
export const FETCH_COLORS = generateActionName('FETCH_COLORS', NS);
export const FETCH_COLORS_ERROR = generateActionName('FETCH_COLORS_ERROR', NS);
export const FETCH_COLORS_SUCCESS = generateActionName(
  'FETCH_COLORS_SUCCESS', NS);

export const COLOR_CLICKED = generateActionName('COLOR_CLICKED', NS);
export const SELECT_COLOR = generateActionName('SELECT_COLOR', NS);
export const DESELECT_COLOR = generateActionName('DESELECT_COLOR', NS);
