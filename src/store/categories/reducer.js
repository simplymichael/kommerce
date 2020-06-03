import { fromJS } from 'immutable';
import reducerRegistry from '../reducer-registry';
import {
  FETCH_CATEGORIES,
  FETCH_CATEGORIES_ERROR,
  FETCH_CATEGORIES_SUCCESS,
} from './constants';

export const reducerName = 'category';
export const initialState = fromJS({
  categories: [],
  isFetchingCategories: false,
  fetchCategoriesError: null,
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case FETCH_CATEGORIES:
    return state
      .set('isFetchingCategories', true)
      .set('fetchCategoriesError', null);

  case FETCH_CATEGORIES_ERROR:
    return state
      .set('isFetchingCategories', false)
      .set('fetchCategoriesError', action.error);

  case FETCH_CATEGORIES_SUCCESS:
    return state
      .set('isFetchingCategories', false)
      .set('fetchCategoriesError', null)
      .set('categories', fromJS(action.payload.categories));

  default: return state;
  }
}

reducerRegistry.register(reducerName, reducer);
