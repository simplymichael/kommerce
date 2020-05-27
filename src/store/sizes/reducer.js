import { fromJS } from 'immutable';
import reducerRegistry from '../reducer-registry';
import {
  FETCH_SIZES,
  FETCH_SIZES_ERROR,
  FETCH_SIZES_SUCCESS,
  SELECT_SIZE,
  DESELECT_SIZE,
} from './constants';

export const reducerName = 'sizes';
export const initialState = fromJS({
  sizes: [],
  isFetchingSizes: false,
  fetchSizesError: null,
  selectedSizes: [],
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_SIZES:
    return state
      .set('isFetchingSizes', true)
      .set('fetchSizesError', null);

  case FETCH_SIZES_ERROR:
    return state
      .set('isFetchingSizes', false)
      .set('fetchSizesError', action.error);

  case FETCH_SIZES_SUCCESS:
    return state
      .set('isFetchingSizes', false)
      .set('fetchSizesError', null)
      .set('sizes', fromJS(action.payload.sizes));

  case SELECT_SIZE:
    return state
      .update('sizes', immutableList => immutableList.update(
        immutableList.findIndex(s => s.get('value') === action.payload.size),
        size => size.set('selected', true)
      ))
      .update('selectedSizes', immutableList =>
        immutableList.findIndex(size => size === action.payload.size) < 0
          ? immutableList.concat([action.payload.size])
          : immutableList
      );

  case DESELECT_SIZE:
    return state
      .update('sizes', immutableList => immutableList.update(
        immutableList.findIndex(s => s.get('value') === action.payload.size),
        size => size.set('selected', false)
      ))
      .update('selectedSizes', immutableList =>
        immutableList.filter(size => size !== action.payload.size));

  default: return state;
  }
}

reducerRegistry.register(reducerName, reducer);
