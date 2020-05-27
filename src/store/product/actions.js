import { generateAction, generateErrorAction } from '../utils';
import {
  FETCH_PRODUCT_DETAILS,
  FETCH_PRODUCT_DETAILS_ERROR,
  FETCH_PRODUCT_DETAILS_SUCCESS,

  FETCH_RELATED_PRODUCTS,
  FETCH_RELATED_PRODUCTS_ERROR,
  FETCH_RELATED_PRODUCTS_SUCCESS,
} from './constants';

export function fetchProductDetails(productId) {
  return generateAction(FETCH_PRODUCT_DETAILS, { productId });
}

export function fetchProductDetailsError(error) {
  return generateErrorAction(FETCH_PRODUCT_DETAILS_ERROR, error);
}

export function fetchProductDetailsSuccess(productDetails) {
  return generateAction(FETCH_PRODUCT_DETAILS_SUCCESS, { productDetails });
}

export function fetchRelatedProducts(productId) {
  return generateAction(FETCH_RELATED_PRODUCTS, { productId });
}

export function fetchRelatedProductsError(error) {
  return generateErrorAction(FETCH_RELATED_PRODUCTS_ERROR, error);
}

export function fetchRelatedProductsSuccess(products) {
  return generateAction(FETCH_RELATED_PRODUCTS_SUCCESS, { products });
}
