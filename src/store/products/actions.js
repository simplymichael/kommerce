import { generateAction, generateErrorAction } from '../utils';
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS,
} from './constants';

export function fetchProducts(queryData = {}) {
  const { page = 1, limit = 0, colors = [], size = '', brands = [],
    orderBy = {}, priceRange = {}} = queryData;

  return generateAction(FETCH_PRODUCTS,
    { page, limit, colors, size, brands, orderBy, priceRange });
}

export function fetchProductsError(error) {
  return generateErrorAction(FETCH_PRODUCTS_ERROR, error);
}

export function fetchProductsSuccess(products) {
  return generateAction(FETCH_PRODUCTS_SUCCESS, { products });
}
