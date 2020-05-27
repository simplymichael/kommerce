import { fromJS } from 'immutable';
import strings from '../../resources/strings';
import reducerRegistry from '../reducer-registry';
import { ACTIVATE_ADJUSTED_PRICE_RANGE } from './constants';

const { min, max } = strings.priceRangeSelector;
export const reducerName = 'prices';
export const initialState = fromJS({
  priceRange: { min, max },
});

export default function reducer(state = initialState, action) {
  switch (action.type) {
  case ACTIVATE_ADJUSTED_PRICE_RANGE:
    return state
      .set('priceRange', fromJS(action.payload.newRange));

  default: return state;
  }
}

reducerRegistry.register(reducerName, reducer);
