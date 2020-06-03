import { generateActionName } from '../utils';

const NS = 'Products';
export const FETCH_PRODUCTS = generateActionName('FETCH_PRODUCTS', NS);
export const FETCH_PRODUCTS_ERROR = generateActionName(
  'FETCH_PRODUCTS_ERROR', NS);
export const FETCH_PRODUCTS_SUCCESS = generateActionName(
  'FETCH_PRODUCTS_SUCCESS', NS);

export const FETCH_RECENT_PRODUCTS = generateActionName(
  'FETCH_RECENT_PRODUCTS', NS);
export const FETCH_RECENT_PRODUCTS_ERROR = generateActionName(
  'FETCH_RECENT_PRODUCTS_ERROR', NS);
export const FETCH_RECENT_PRODUCTS_SUCCESS = generateActionName(
  'FETCH_RECENT_PRODUCTS_SUCCESS', NS);


export const SEARCH_PRODUCTS = generateActionName('SEARCH_PRODUCTS', NS);
export const SEARCH_PRODUCTS_ERROR = generateActionName(
  'SEARCH_PRODUCTS_ERROR', NS);
export const SEARCH_PRODUCTS_SUCCESS = generateActionName(
  'SEARCH_PRODUCTS_SUCCESS', NS);

export const CLEAR_SEARCH = generateActionName('CLEAR_SEARCH', NS);
