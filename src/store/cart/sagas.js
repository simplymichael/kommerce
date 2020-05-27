import { all, call, put, takeEvery } from 'redux-saga/effects';
import sagaRegistry from '../saga-registry';
import {
  FETCH_CART_ITEMS,
  COUNT_CART_ITEMS,
  ADD_PRODUCT_TO_CART,
  REMOVE_PRODUCT_FROM_CART,

  INCREASE_PRODUCT_QUANTITY_IN_CART,
  DECREASE_PRODUCT_QUANTITY_IN_CART,
  EMPTY_CART,
  FETCH_CART_PRICE,
} from './constants';

import {
  fetchCartItemsError,
  fetchCartItemsSuccess,
  countCartItemsError,
  countCartItemsSuccess,
  addProductToCartError,
  addProductToCartSuccess,
  removeProductFromCartError,
  removeProductFromCartSuccess,
  increaseProductQuantityInCartError,
  increaseProductQuantityInCartSuccess,
  decreaseProductQuantityInCartError,
  decreaseProductQuantityInCartSuccess,
  emptyCartError,
  emptyCartSuccess,
  fetchCartPrice as actionFetchCartPrice,
  fetchCartPriceError,
  fetchCartPriceSuccess,
} from './actions';

let service = null;

function* fetchCartItems() {
  try {
    const items = yield call(() => service.getItemsInCart());

    yield put(fetchCartItemsSuccess(items));
    yield put(actionFetchCartPrice());
  } catch (err) {
    yield put(fetchCartItemsError(err.toString()));
  }
}

function* addProductToCart(action) {
  const { payload: { product, color, size, quantity } } = action;
  const updatedProduct = { ...product, color, size };

  try {
    yield call(() => service.addToCart(updatedProduct, quantity));
    yield put(addProductToCartSuccess(updatedProduct));
    yield put(actionFetchCartPrice());
  } catch(err) {
    yield put(addProductToCartError( err.toString(), updatedProduct ));
  }
}

function* countCartItems() {
  try {
    const count = yield call(() => service.countItemsInCart());

    yield put(countCartItemsSuccess(count));
  } catch(err) {
    yield put(countCartItemsError(err.toString()));
  }
}

function* removeProductFromCart(action) {
  const { product } = action.payload;

  try {
    yield call(() => service.removeFromCart(product));

    yield put(removeProductFromCartSuccess(product));
    yield put(actionFetchCartPrice());
  } catch(err) {
    yield put(removeProductFromCartError( err.toString(), product ));
  }
}

function* increaseProductQuantity(action) {
  const { product, incrementAmount } = action.payload;

  try {
    // Increment the product count in the cart by the specified increment value
    yield call(() => service.addToCart(product, incrementAmount));

    yield put(increaseProductQuantityInCartSuccess(product, incrementAmount));
    yield put(actionFetchCartPrice());
  } catch(err) {
    yield put(increaseProductQuantityInCartError(err.toString()));
  }
}

function* decreaseProductQuantity(action) {
  const { product, decrementAmount } = action.payload;

  try {
    // Decrement the product count in the cart by the specified decrement value
    yield call(() => service.addToCart(product, -decrementAmount));

    yield put(decreaseProductQuantityInCartSuccess(product, decrementAmount));
    yield put(actionFetchCartPrice());
  } catch(err) {
    yield put(decreaseProductQuantityInCartError(err.toString()));
  }
}

function* emptyCart() {
  try {
    yield call(() => service.emptyCart());

    yield put(emptyCartSuccess());
    yield put(actionFetchCartPrice());
  } catch(err) {
    yield put(emptyCartError(err.toString()));
  }
}

function* fetchCartPrice() {
  try {
    const { subTotal, grandTotal } = yield call(() => service.getCartPrice());

    yield put(fetchCartPriceSuccess({ subTotal, grandTotal }));
  } catch(err) {
    yield put(fetchCartPriceError(err.toString()));
  }
}

export const sagaName = 'cart';
export default function(injectedService) {
  service = injectedService;

  function* watcher() {
    yield all([
      takeEvery(FETCH_CART_ITEMS, fetchCartItems),
      takeEvery(ADD_PRODUCT_TO_CART, addProductToCart),
      takeEvery(COUNT_CART_ITEMS, countCartItems),
      takeEvery(REMOVE_PRODUCT_FROM_CART, removeProductFromCart),
      takeEvery(INCREASE_PRODUCT_QUANTITY_IN_CART, increaseProductQuantity),
      takeEvery(DECREASE_PRODUCT_QUANTITY_IN_CART, decreaseProductQuantity),
      takeEvery(EMPTY_CART, emptyCart),
      takeEvery(FETCH_CART_PRICE, fetchCartPrice),
    ]);
  }

  sagaRegistry.register(sagaName, watcher);
}
