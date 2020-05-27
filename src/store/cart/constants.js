import { generateActionName } from '../utils';

const NS = 'Cart';
export const ADD_PRODUCT_TO_CART = generateActionName('ADD_PRODUCT_TO_CART', NS);
export const ADD_PRODUCT_TO_CART_ERROR = generateActionName(
  'ADD_PRODUCT_TO_CART_ERROR', NS);
export const ADD_PRODUCT_TO_CART_SUCCESS = generateActionName(
  'ADD_PRODUCT_TO_CART_SUCCESS', NS);

export const FETCH_CART_ITEMS = generateActionName('FETCH_CART_ITEMS', NS);
export const FETCH_CART_ITEMS_ERROR = generateActionName(
  'FETCH_CART_ITEMS_ERROR', NS);
export const FETCH_CART_ITEMS_SUCCESS = generateActionName(
  'FETCH_CART_ITEMS_SUCCESS', NS);

export const COUNT_CART_ITEMS = generateActionName('COUNT_CART_ITEMS', NS);
export const COUNT_CART_ITEMS_ERROR = generateActionName(
  'COUNT_CART_ITEMS_ERROR', NS);
export const COUNT_CART_ITEMS_SUCCESS = generateActionName(
  'COUNT_CART_ITEMS_SUCCESS', NS);

export const REMOVE_PRODUCT_FROM_CART = generateActionName(
  'REMOVE_PRODUCT_FROM_CART', NS);
export const REMOVE_PRODUCT_FROM_CART_ERROR = generateActionName(
  'REMOVE_PRODUCT_FROM_CART_ERROR', NS);
export const REMOVE_PRODUCT_FROM_CART_SUCCESS = generateActionName(
  'REMOVE_PRODUCT_FROM_CART_SUCCESS', NS);

export const INCREASE_PRODUCT_QUANTITY_IN_CART = generateActionName(
  'INCREASE_PRODUCT_QUANTITY_IN_CART', NS);
export const INCREASE_PRODUCT_QUANTITY_IN_CART_ERROR = generateActionName(
  'INCREASE_PRODUCT_QUANTITY_IN_CART_ERROR', NS);
export const INCREASE_PRODUCT_QUANTITY_IN_CART_SUCCESS = generateActionName(
  'INCREASE_PRODUCT_QUANTITY_IN_CART_SUCCESS', NS);

export const DECREASE_PRODUCT_QUANTITY_IN_CART = generateActionName(
  'DECREASE_PRODUCT_QUANTITY_IN_CART', NS);
export const DECREASE_PRODUCT_QUANTITY_IN_CART_ERROR = generateActionName(
  'DECREASE_PRODUCT_QUANTITY_IN_CART_ERROR', NS);
export const DECREASE_PRODUCT_QUANTITY_IN_CART_SUCCESS = generateActionName(
  'DECREASE_PRODUCT_QUANTITY_IN_CART_SUCCESS', NS);

export const EMPTY_CART = generateActionName('EMPTY_CART', NS);
export const EMPTY_CART_ERROR = generateActionName('EMPTY_CART_ERROR', NS);
export const EMPTY_CART_SUCCESS = generateActionName('EMPTY_CART_SUCCESS', NS);

export const FETCH_CART_PRICE = generateActionName('FETCH_CART_PRICE', NS);
export const FETCH_CART_PRICE_ERROR = generateActionName(
  'FETCH_CART_PRICE_ERROR', NS);
export const FETCH_CART_PRICE_SUCCESS = generateActionName(
  'FETCH_CART_PRICE_SUCCESS', NS);
