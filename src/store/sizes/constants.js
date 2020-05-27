import { generateActionName } from '../utils';

const NS = 'Sizes';
export const FETCH_SIZES = generateActionName('FETCH_SIZES', NS);
export const FETCH_SIZES_ERROR = generateActionName('FETCH_SIZES_ERROR', NS);
export const FETCH_SIZES_SUCCESS = generateActionName('FETCH_SIZES_SUCCESS', NS);

export const SIZE_CLICKED = generateActionName('SIZE_CLICKED', NS);
export const SELECT_SIZE = generateActionName('SELECT_SIZE', NS);
export const DESELECT_SIZE = generateActionName('DESELECT_SIZE', NS);
