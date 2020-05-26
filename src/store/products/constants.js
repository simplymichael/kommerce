import { generateActionName } from '../utils';

const NS = 'Products';
export const FETCH_PRODUCTS = generateActionName('FETCH_PRODUCTS', NS);
export const FETCH_PRODUCTS_ERROR = generateActionName(
  'FETCH_PRODUCTS_ERROR', NS);
export const FETCH_PRODUCTS_SUCCESS = generateActionName(
  'FETCH_PRODUCTS_SUCCESS', NS);

export const FETCH_LATEST_PRODUCTS = generateActionName(
  'FETCH_LATEST_PRODUCTS', NS);
export const FETCH_LATEST_PRODUCTS_ERROR = generateActionName(
  'FETCH_LATEST_PRODUCTS_ERROR', NS);
export const FETCH_LATEST_PRODUCTS_SUCCESS = generateActionName(
  'FETCH_LATEST_PRODUCTS_SUCCESS', NS);
