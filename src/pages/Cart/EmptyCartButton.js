import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import strings from '../../resources/strings';
import {
  emptyCart,
  makeSelectIsEmptyingCart,
} from '../../store/cart';

const EmptyCartButton = ({clearCart, isClearingCart }) => {
  if(isClearingCart) {
    return (
      <Button role="clear-cart-button" className="btn-danger" disabled={true}>
        {strings.cart.clearCart.text}
      </Button>
    );
  }

  return (
    <Button
      title={strings.cart.clearCart.title}
      role="clear-cart-button" className="btn-danger"
      onClick={() => clearCart()}>
      {strings.cart.clearCart.text}
    </Button>
  );
};

const mapDispatchToProps = dispatch => ({
  clearCart: () => dispatch(emptyCart()),
});

const mapStateToProps = createStructuredSelector({
  clearingCart: makeSelectIsEmptyingCart(),
});

EmptyCartButton.propTypes = {
  clearCart: PropTypes.func,
  isClearingCart: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(EmptyCartButton);
