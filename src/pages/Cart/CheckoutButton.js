import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import colors from '../../resources/colors';
import strings from '../../resources/strings';
import {
  makeSelectCartItemsCount,
  makeSelectIsCountingCartItems,
  makeSelectCountCartItemsError,
} from '../../store/cart';

const Btn = styled(Button)`
  margin-left: 10px;
  color: ${() => colors.product.actionButtonText}
  border-color: ${() => colors.product.actionButtonBorder}

  :hover {
    text-decoration: none;
    color: ${() => colors.product.actionButtonHoverText}
    background-color: ${() => colors.product.actionButtonHover}
    border-color: ${() => colors.product.actionButtonHoverBorder}
  }
`;

const CheckoutButton = (props) => {
  const {cartItemsCount, isCountingCartItems, countCartItemsError } = props;

  if(isCountingCartItems) {
    return (
      <Btn
        disabled={true}
        className="action-btn btn-processing btn-primary">
        ...
      </Btn>
    );
  }

  if(countCartItemsError) {
    return (
      <Btn
        disabled={true}
        className="btn action-btn btn-primary">
        {strings.cart.countItemsError}
      </Btn>
    );
  }

  if(cartItemsCount === 0) {
    return (
      <Button
        disabled={true}
        className="btn action-btn btn-primary">
        {strings.cart.noItems}
      </Button>
    );
  }

  return (
    <Btn
      as={Link} to="/checkout"
      title={strings.cart.checkout.title}
      className="btn action-btn btn-primary">
      {strings.cart.checkout.text}
    </Btn>
  );
};

CheckoutButton.propTypes = {
  cartItemsCount: PropTypes.number,
  isCountingCartItems: PropTypes.bool,
  countCartItemsError: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  // The EmptyCartButton component
  // dispatches the action to count cart items,
  // we are only accessing those values here.
  cartItemsCount: makeSelectCartItemsCount(),
  isCountingCartItems: makeSelectIsCountingCartItems(),
  countCartItemsError: makeSelectCountCartItemsError(),
});

export default connect(mapStateToProps)(CheckoutButton);
