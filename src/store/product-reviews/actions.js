import { generateAction, generateErrorAction } from '../utils';
import {
  ADD_PRODUCT_REVIEW,
  ADD_PRODUCT_REVIEW_ERROR,
  ADD_PRODUCT_REVIEW_SUCCESS,

  FETCH_PRODUCT_REVIEWS,
  FETCH_PRODUCT_REVIEWS_ERROR,
  FETCH_PRODUCT_REVIEWS_SUCCESS,
} from './constants';

export function addProductReview(productId, {authorName, reviewText, rating}) {
  return generateAction(ADD_PRODUCT_REVIEW, {
    productId,
    authorName,
    reviewText,
    rating,
  });
}

export function addProductReviewError(error) {
  return generateErrorAction(ADD_PRODUCT_REVIEW_ERROR, error);
}

export function addProductReviewSuccess() {
  return generateAction(ADD_PRODUCT_REVIEW_SUCCESS);
}

export function fetchProductReviews(productId) {
  return generateAction(FETCH_PRODUCT_REVIEWS, { productId });
}

export function fetchProductReviewsError(error) {
  return generateErrorAction(FETCH_PRODUCT_REVIEWS_ERROR, error);
}

export function fetchProductReviewsSuccess(reviews) {
  return generateAction(FETCH_PRODUCT_REVIEWS_SUCCESS, { reviews });
}
