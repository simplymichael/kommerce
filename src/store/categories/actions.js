import { generateAction, generateErrorAction } from '../utils';
import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_ERROR,
  FETCH_CATEGORIES_SUCCESS,
} from './constants';

export function fetchCategories() {
  return generateAction(FETCH_CATEGORIES);
}

export function fetchCategoriesError(error) {
  return generateErrorAction(FETCH_CATEGORIES_ERROR, error);
}

export function fetchCategoriesSuccess(categories) {
  return generateAction(FETCH_CATEGORIES_SUCCESS, { categories });
}
