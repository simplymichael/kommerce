import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import strings from '../../resources/strings';
import {
  countCartItems,
  makeSelectCartItemsCount,
  makeSelectIsCountingCartItems,
  makeSelectCountCartItemsError,

  emptyCart,
  makeSelectIsEmptyingCart,
} from '../../store/cart';

const EmptyCartButton = (props) => {
  const cartStrings = strings.pages.cart();
  const {
    cartItemsCount,
    isCountingCartItems,
    countCartItemsError,
    clearCart,
    isClearingCart
  } = props;

  useEffect(() => {
    countCartItems(); // eslint-disable-next-line
  }, []);

  if(isCountingCartItems) {
    return (
      <Button
        disabled={true}
        className="action-btn btn-processing btn-danger">
        ...
      </Button>
    );
  }

  if(countCartItemsError) {
    return (
      <Button
        disabled={true}
        className="action-btn btn-danger">
        {cartStrings.countItemsError}
      </Button>
    );
  }

  if(isClearingCart) {
    return (
      <Button
        role="clear-cart-button"
        disabled={true}
        className="action-btn btn-processing btn-danger">
        {cartStrings.clearCart.text}
      </Button>
    );
  }

  if(cartItemsCount === 0) {
    return (
      <Button
        disabled={true}
        className="action-btn btn-danger">
        {cartStrings.noItems}
      </Button>
    );
  }

  return (
    <Button
      title={cartStrings.clearCart.title}
      role="clear-cart-button"
      className="action-btn btn-danger"
      onClick={() => clearCart()}>
      {cartStrings.clearCart.text}
    </Button>
  );
};

const mapDispatchToProps = dispatch => ({
  countCartItems: () => dispatch(countCartItems()),
  clearCart: () => dispatch(emptyCart()),
});

const mapStateToProps = createStructuredSelector({
  cartItemsCount: makeSelectCartItemsCount(),
  isCountingCartItems: makeSelectIsCountingCartItems(),
  countCartItemsError: makeSelectCountCartItemsError(),
  clearingCart: makeSelectIsEmptyingCart(),
});

EmptyCartButton.propTypes = {
  countCartItems: PropTypes.func,
  cartItemsCount: PropTypes.number,
  isCountingCartItems: PropTypes.bool,
  countCartItemsError: PropTypes.string,
  clearCart: PropTypes.func,
  isClearingCart: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(EmptyCartButton);
