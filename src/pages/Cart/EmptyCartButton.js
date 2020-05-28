import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import {
  emptyCart,
  makeSelectIsEmptyingCart,
} from '../../store/cart';

const EmptyCartButton = ({clearCart, isClearingCart }) => {
  if(isClearingCart) {
    return (
      <Button role="clear-cart-button" className="btn-danger" disabled={true}>
        Empty cart
      </Button>
    );
  }

  return (
    <Button role="clear-cart-button" className="btn-danger"
      onClick={() => clearCart()}>
      Empty cart
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
