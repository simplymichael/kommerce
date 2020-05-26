import { fromJS } from 'immutable';
import reducerRegistry from '../reducer-registry';
import {
  FETCH_COLORS,
  FETCH_COLORS_ERROR,
  FETCH_COLORS_SUCCESS,
  SELECT_COLOR,
  DESELECT_COLOR,
} from './constants';

export const reducerName = 'colors';
export const initialState = fromJS({
  colors: [],
  isFetchingColors: false,
  fetchColorsError: null,
  selectedColors: [],
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_COLORS:
    return state
      .set('isFetchingColors', true)
      .set('fetchColorsError', null);

  case FETCH_COLORS_ERROR:
    return state
      .set('isFetchingColors', false)
      .set('fetchColorsError', action.error);

  case FETCH_COLORS_SUCCESS:
    return state
      .set('isFetchingColors', false)
      .set('fetchColorsError', null)
      .set('colors', fromJS(action.payload.colors));

  case SELECT_COLOR:
    return state
      .update('colors', immutableList => immutableList.update(
        immutableList.findIndex(c => c.get('name') === action.payload.color),
        color => color.set('selected', true)
      ))
      .update('selectedColors', immutableList =>
        immutableList.findIndex(color => color === action.payload.color) < 0
          ? immutableList.concat([action.payload.color])
          : immutableList
      );

  case DESELECT_COLOR:
    return state
      .update('colors', immutableList => immutableList.update(
        immutableList.findIndex(c => c.get('name') === action.payload.color),
        color  => color.set('selected', false)
      ))
      .update('selectedColors', immutableList =>
        immutableList.filter(color => color !== action.payload.color));

  default: return state;
  }
}

reducerRegistry.register(reducerName, reducer);
