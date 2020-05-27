import sagas from './sagas';
import reducer from './reducer';
import {
  fetchCartItems,
  countCartItems,
  addProductToCart,
  removeProductFromCart,
  increaseProductQuantityInCart,
  decreaseProductQuantityInCart,
  emptyCart,
  fetchCartPrice,
} from './actions';

import {
  makeSelectIsFetchingCartItems,
  makeSelectFetchCartItemsError,
  makeSelectCartItems,

  makeSelectIsCountingCartItems,
  makeSelectCountCartItemsError,
  makeSelectCartItemsCount,

  makeSelectAddProductToCartError,
  makeSelectProductsBeingAddedToCart,

  makeSelectRemoveProductFromCartError,
  makeSelectProductsBeingRemovedFromCart,

  makeSelectIsEmptyingCart,
  makeSelectEmptyCartError,

  makeSelectIsFetchingCartPrice,
  makeSelectFetchCartPriceError,
  makeSelectCartPriceData,
} from './selectors';

export {
  sagas,
  reducer,

  fetchCartItems,
  countCartItems,
  addProductToCart,
  removeProductFromCart,

  increaseProductQuantityInCart,
  decreaseProductQuantityInCart,

  makeSelectAddProductToCartError,
  makeSelectProductsBeingAddedToCart,

  makeSelectIsCountingCartItems,
  makeSelectCountCartItemsError,
  makeSelectCartItemsCount,

  makeSelectIsFetchingCartItems,
  makeSelectFetchCartItemsError,
  makeSelectCartItems,

  makeSelectRemoveProductFromCartError,
  makeSelectProductsBeingRemovedFromCart,

  emptyCart,
  makeSelectIsEmptyingCart,
  makeSelectEmptyCartError,

  fetchCartPrice,
  makeSelectIsFetchingCartPrice,
  makeSelectFetchCartPriceError,
  makeSelectCartPriceData,
};
