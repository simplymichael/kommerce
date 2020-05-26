import sagas from './sagas';
import reducer from './reducer';
import { fetchColors, onColorClick } from './actions';
import {
  makeSelectColors,
  makeSelectSelectedColors,
  makeSelectIsFetchingColors,
  makeSelectFetchColorsError,
} from './selectors';

export {
  reducer,
  sagas,
  fetchColors,
  onColorClick,
  makeSelectColors,
  makeSelectSelectedColors,
  makeSelectIsFetchingColors,
  makeSelectFetchColorsError,
};
