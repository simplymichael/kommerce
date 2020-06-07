import { generateAction, generateErrorAction } from '../utils';
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS,

  FETCH_RECENT_PRODUCTS,
  FETCH_RECENT_PRODUCTS_ERROR,
  FETCH_RECENT_PRODUCTS_SUCCESS,

  COUNT_PRODUCTS,
  COUNT_PRODUCTS_ERROR,
  COUNT_PRODUCTS_SUCCESS,
} from './constants';

/**
 * queryData object with properties:
 * page = 1, limit = 0,
 * colors = [], sizes = [], brands = [],
 * orderBy = {}, priceRange = {}, categories = [], searchTerm = ''
 */
export function fetchProducts(queryData = {}) {
  return generateAction(FETCH_PRODUCTS, queryData);
}

export function fetchProductsError(error) {
  return generateErrorAction(FETCH_PRODUCTS_ERROR, error);
}

export function fetchProductsSuccess(products) {
  return generateAction(FETCH_PRODUCTS_SUCCESS, { products });
}

export function fetchRecentProducts(limit) {
  return generateAction(FETCH_RECENT_PRODUCTS, { limit });
}

export function fetchRecentProductsError(error) {
  return generateErrorAction(FETCH_RECENT_PRODUCTS_ERROR, error);
}

export function fetchRecentProductsSuccess(products) {
  return generateAction(FETCH_RECENT_PRODUCTS_SUCCESS, { products });
}

/**
 * Count the total number of products that meet the 'search' query parameters.
 * Useful for getting the total products count in pagination routines.
 *
 * @param queryData object with properties:
 * page = 1, limit = 0,
 * colors = [], sizes = [], brands = [],
 * orderBy = {}, priceRange = {}, categories = [], searchTerm = ''
 */
export function countProducts(queryData = {}) {
  return generateAction(COUNT_PRODUCTS, queryData);
}

export function countProductsError(error) {
  return generateErrorAction(COUNT_PRODUCTS_ERROR, error);
}

export function countProductsSuccess(count) {
  return generateAction(COUNT_PRODUCTS_SUCCESS, { count });
}
