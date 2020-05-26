import { generateActionName } from '../utils';

const NS = 'Brands';
export const FETCH_BRANDS = generateActionName('FETCH_BRANDS', NS);
export const FETCH_BRANDS_ERROR = generateActionName('FETCH_BRANDS_ERROR', NS);
export const FETCH_BRANDS_SUCCESS = generateActionName(
  'FETCH_BRANDS_SUCCESS', NS);
export const BRAND_CLICKED = generateActionName('BRAND_CLICKED', NS);
export const SELECT_BRAND = generateActionName('SELECT_BRAND', NS);
export const DESELECT_BRAND = generateActionName('DESELECT_BRAND', NS);
