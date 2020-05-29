import { generateActionName } from '../utils';

const NS = 'ProductReviews';
export const ADD_PRODUCT_REVIEW = generateActionName('ADD_PRODUCT_REVIEW', NS);
export const ADD_PRODUCT_REVIEW_ERROR = generateActionName(
  'ADD_PRODUCT_REVIEW_ERROR', NS);
export const ADD_PRODUCT_REVIEW_SUCCESS = generateActionName(
  'ADD_PRODUCT_REVIEW_SUCCESS', NS);

export const FETCH_PRODUCT_REVIEWS = generateActionName(
  'FETCH_PRODUCT_REVIEWS', NS);
export const FETCH_PRODUCT_REVIEWS_ERROR = generateActionName(
  'FETCH_PRODUCT_REVIEWS_ERROR', NS);
export const FETCH_PRODUCT_REVIEWS_SUCCESS = generateActionName(
  'FETCH_PRODUCT_REVIEWS_SUCCESS', NS);
