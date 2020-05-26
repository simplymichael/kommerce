import { generateAction, generateErrorAction } from '../utils';
import {
  FETCH_BRANDS,
  FETCH_BRANDS_ERROR,
  FETCH_BRANDS_SUCCESS,
  BRAND_CLICKED,
  SELECT_BRAND,
  DESELECT_BRAND,
} from './constants';

export function fetchBrands() {
  return generateAction(FETCH_BRANDS);
}

export function fetchBrandsError(error) {
  return generateErrorAction(FETCH_BRANDS_ERROR, error);
}

export function fetchBrandsSuccess(brands) {
  return generateAction(FETCH_BRANDS_SUCCESS, { brands });
}

export function onBrandClick(brand, checked) {
  return generateAction(BRAND_CLICKED, { brand, checked });
}

export function selectBrand(brand) {
  return generateAction(SELECT_BRAND, { brand });
}

export function deselectBrand(brand) {
  return generateAction(DESELECT_BRAND, { brand });
}
