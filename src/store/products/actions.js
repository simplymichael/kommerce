import { generateAction, generateErrorAction } from '../utils';
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS,

  FETCH_LATEST_PRODUCTS,
  FETCH_LATEST_PRODUCTS_ERROR,
  FETCH_LATEST_PRODUCTS_SUCCESS,
} from './constants';

export function fetchProducts(queryData = {}) {
  const {
    page = 1,
    limit = 0,
    color = '',
    size = '',
    brands = [],
    orderBy = {},
    priceRange = {}
  } = queryData;

  return generateAction(FETCH_PRODUCTS,
    { page, limit, color, size, brands, orderBy, priceRange });
}

export function fetchProductsError(error) {
  return generateErrorAction(FETCH_PRODUCTS_ERROR, error);
}

export function fetchProductsSuccess(products) {
  return generateAction(FETCH_PRODUCTS_SUCCESS, { products });
}

export function fetchLatestProducts(count = 0) {
  return generateAction(FETCH_LATEST_PRODUCTS, { count });
}

export function fetchLatestProductsError(error) {
  return generateErrorAction(FETCH_LATEST_PRODUCTS_ERROR, error);
}

export function fetchLatestProductsSuccess(latestProducts) {
  return generateAction(FETCH_LATEST_PRODUCTS_SUCCESS, { latestProducts });
}
