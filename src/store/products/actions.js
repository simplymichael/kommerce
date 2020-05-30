import { generateAction, generateErrorAction } from '../utils';
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS,

  FETCH_RECENT_PRODUCTS,
  FETCH_RECENT_PRODUCTS_ERROR,
  FETCH_RECENT_PRODUCTS_SUCCESS,
} from './constants';

export function fetchProducts(queryData = {}) {
  const { page = 1, limit = 0, colors = [], sizes = [], brands = [],
    orderBy = {}, priceRange = {}} = queryData;

  return generateAction(FETCH_PRODUCTS,
    { page, limit, colors, sizes, brands, orderBy, priceRange });
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
