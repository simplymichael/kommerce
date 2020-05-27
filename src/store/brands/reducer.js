import { fromJS } from 'immutable';
import reducerRegistry from '../reducer-registry';
import {
  FETCH_BRANDS,
  FETCH_BRANDS_ERROR,
  FETCH_BRANDS_SUCCESS,
  SELECT_BRAND,
  DESELECT_BRAND,
} from './constants';

export const reducerName = 'brands';
export const initialState = fromJS({
  brands: [],
  fetchBrandsError: null,
  isFetchingBrands: false,
  selectedBrands: [],
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_BRANDS:
    return state
      .set('isFetchingBrands', true)
      .set('fetchBrandsError', null);

  case FETCH_BRANDS_ERROR:
    return state
      .set('isFetchingBrands', false)
      .set('fetchBrandsError', action.error);

  case FETCH_BRANDS_SUCCESS:
    return state
      .set('isFetchingBrands', false)
      .set('fetchBrandsError', null)
      .set('brands', fromJS(action.payload.brands));

  case SELECT_BRAND:
    return state
      .update('brands', immutableList => immutableList.update(
        immutableList.findIndex(b => b.get('name') === action.payload.brand),
        brand => brand.set('selected', true)
      ))
      .update('selectedBrands', immutableList =>
        immutableList.findIndex(brand => brand === action.payload.brand) < 0
          ? immutableList.concat([action.payload.brand])
          : immutableList
      );

  case DESELECT_BRAND:
    return state
      .update('brands', immutableList => immutableList.update(
        immutableList.findIndex(b => b.get('name') === action.payload.brand),
        brand => brand.set('selected', false)
      ))
      .update('selectedBrands', immutableList =>
        immutableList.filter(brand => brand !== action.payload.brand));

  default: return state;
  }
}

reducerRegistry.register(reducerName, reducer);
