import { generateActionName } from '../utils';

const NS = 'Categories';
export const FETCH_CATEGORIES = generateActionName('FETCH_CATEGORIES', NS);
export const FETCH_CATEGORIES_ERROR = generateActionName(
  'FETCH_CATEGORIES_ERROR', NS);
export const FETCH_CATEGORIES_SUCCESS = generateActionName(
  'FETCH_CATEGORIES_SUCCESS', NS);
