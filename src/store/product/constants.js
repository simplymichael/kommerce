import { generateActionName } from '../utils';

const NS = 'ProductPage';
export const FETCH_PRODUCT_DETAILS = generateActionName(
  'FETCH_PRODUCT_DETAILS', NS);
export const FETCH_PRODUCT_DETAILS_ERROR = generateActionName(
  'FETCH_PRODUCT_DETAILS_ERROR', NS);
export const FETCH_PRODUCT_DETAILS_SUCCESS = generateActionName(
  'FETCH_PRODUCT_DETAILS_SUCCESS', NS);

export const FETCH_RELATED_PRODUCTS = generateActionName(
  'FETCH_RELATED_PRODUCTS', NS);
export const FETCH_RELATED_PRODUCTS_ERROR = generateActionName(
  'FETCH_RELATED_PRODUCTS_ERROR', NS);
export const FETCH_RELATED_PRODUCTS_SUCCESS = generateActionName(
  'FETCH_RELATED_PRODUCTS_SUCCESS', NS);
