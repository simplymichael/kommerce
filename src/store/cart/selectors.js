import { createSelector } from 'reselect';
import { initialState, reducerName } from './reducer';

export const localState = state => state.get(reducerName, initialState);

export const makeSelectCartItems = () =>
  createSelector(localState, state => state.get('items').toJS());

export const makeSelectFetchCartItemsError = () =>
  createSelector(localState, state => state.get('fetchCartItemsError'));

export const makeSelectIsFetchingCartItems = () =>
  createSelector(localState, state => state.get('isFetchingCartItems'));


export const makeSelectCartItemsCount = () =>
  createSelector(localState, state => state.get('itemsCount'));

export const makeSelectCountCartItemsError = () =>
  createSelector(localState, state => state.get('countCartItemsError'));

export const makeSelectIsCountingCartItems = () =>
  createSelector(localState, state => state.get('isCountingCartItems'));


export const makeSelectProductsBeingAddedToCart = () =>
  createSelector(localState, state => state.get('addProductToCartList').toJS());

export const makeSelectAddProductToCartError = () =>
  createSelector(localState, state => state.get('addProductToCartError'));

export const makeSelectProductsBeingRemovedFromCart = () =>
  createSelector(localState, state => state.get('removeProductFromCartList').toJS());

export const makeSelectRemoveProductFromCartError = () =>
  createSelector(localState, state => state.get('removeProductFromCartError'));


export const makeSelectIsEmptyingCart = () =>
  createSelector(localState, state => state.get('isEmptyingCart'));

export const makeSelectEmptyCartError = () =>
  createSelector(localState, state => state.get('emptyCartError'));


export const makeSelectIsFetchingCartPrice = () =>
  createSelector(localState, state => state.get('isFetchingCartPrice'));

export const makeSelectFetchCartPriceError = () =>
  createSelector(localState, state => state.get('fetchCartPriceError'));

export const makeSelectCartPriceData = () =>
  createSelector(localState, state => state.get('cartPriceData').toJS());
