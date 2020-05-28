import { generateAction, generateErrorAction } from '../utils';
import {
  ADD_PRODUCT_TO_CART,
  ADD_PRODUCT_TO_CART_ERROR,
  ADD_PRODUCT_TO_CART_SUCCESS,

  FETCH_CART_ITEMS,
  FETCH_CART_ITEMS_ERROR,
  FETCH_CART_ITEMS_SUCCESS,

  COUNT_CART_ITEMS,
  COUNT_CART_ITEMS_ERROR,
  COUNT_CART_ITEMS_SUCCESS,

  REMOVE_PRODUCT_FROM_CART,
  REMOVE_PRODUCT_FROM_CART_ERROR,
  REMOVE_PRODUCT_FROM_CART_SUCCESS,

  INCREASE_PRODUCT_QUANTITY_IN_CART,
  INCREASE_PRODUCT_QUANTITY_IN_CART_ERROR,
  INCREASE_PRODUCT_QUANTITY_IN_CART_SUCCESS,

  DECREASE_PRODUCT_QUANTITY_IN_CART,
  DECREASE_PRODUCT_QUANTITY_IN_CART_ERROR,
  DECREASE_PRODUCT_QUANTITY_IN_CART_SUCCESS,

  EMPTY_CART,
  EMPTY_CART_ERROR,
  EMPTY_CART_SUCCESS,

  FETCH_CART_PRICE,
  FETCH_CART_PRICE_ERROR,
  FETCH_CART_PRICE_SUCCESS,
} from './constants';


export function addProductToCart(product, { color, size, quantity }) {
  return generateAction(ADD_PRODUCT_TO_CART, { product, color, size, quantity });
}

export function addProductToCartError(error, product) {
  return generateErrorAction(ADD_PRODUCT_TO_CART_ERROR, error, { product });
}

export function addProductToCartSuccess(product, quantity) {
  return generateAction(ADD_PRODUCT_TO_CART_SUCCESS, { product, quantity });
}

export function fetchCartItems() {
  return generateAction(FETCH_CART_ITEMS);
}

export function fetchCartItemsError(error) {
  return generateErrorAction(FETCH_CART_ITEMS_ERROR, error);
}

export function fetchCartItemsSuccess(items) {
  return generateAction(FETCH_CART_ITEMS_SUCCESS, { items });
}

export function countCartItems() {
  return generateAction(COUNT_CART_ITEMS);
}

export function countCartItemsError(error) {
  return generateErrorAction(COUNT_CART_ITEMS_ERROR, error);
}

export function countCartItemsSuccess(count) {
  return generateAction(COUNT_CART_ITEMS_SUCCESS, { count });
}

export function removeProductFromCart(product) {
  return generateAction(REMOVE_PRODUCT_FROM_CART, { product });
}

export function removeProductFromCartError(error, product) {
  return generateErrorAction(REMOVE_PRODUCT_FROM_CART_ERROR, error, { product });
}

export function removeProductFromCartSuccess(product) {
  return generateAction(REMOVE_PRODUCT_FROM_CART_SUCCESS, { product });
}

export function increaseProductQuantityInCart(product, incrementAmount) {
  return generateAction(INCREASE_PRODUCT_QUANTITY_IN_CART, {
    product,
    incrementAmount
  });
}

export function increaseProductQuantityInCartError(error) {
  return generateErrorAction(INCREASE_PRODUCT_QUANTITY_IN_CART_ERROR, error);
}

export function increaseProductQuantityInCartSuccess(product, incrementAmount) {
  return generateAction(INCREASE_PRODUCT_QUANTITY_IN_CART_SUCCESS, {
    product,
    incrementAmount
  });
}

export function decreaseProductQuantityInCart(product, decrementAmount) {
  return generateAction(DECREASE_PRODUCT_QUANTITY_IN_CART, {
    product,
    decrementAmount
  });
}

export function decreaseProductQuantityInCartError(error) {
  return generateErrorAction(DECREASE_PRODUCT_QUANTITY_IN_CART_ERROR, error);
}

export function decreaseProductQuantityInCartSuccess(product, decrementAmount) {
  return generateAction(DECREASE_PRODUCT_QUANTITY_IN_CART_SUCCESS, {
    product,
    decrementAmount
  });
}

export function emptyCart() {
  return generateAction(EMPTY_CART);
}

export function emptyCartError(error) {
  return generateErrorAction(EMPTY_CART_ERROR, error);
}

export function emptyCartSuccess() {
  return generateAction(EMPTY_CART_SUCCESS);
}

export function fetchCartPrice() {
  return generateAction(FETCH_CART_PRICE);
}

export function fetchCartPriceError(error) {
  return generateErrorAction(FETCH_CART_PRICE_ERROR, error);
}

export function fetchCartPriceSuccess({ subTotal, grandTotal }) {
  return generateAction(FETCH_CART_PRICE_SUCCESS, {
    subTotal,
    grandTotal,
  });
}
