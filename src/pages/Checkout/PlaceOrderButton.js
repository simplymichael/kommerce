import React, { useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Button } from 'react-bootstrap';
import { Error } from '../../components/Notifications';
import device from '../../utils/device';
import colors from '../../resources/colors';
import strings from '../../resources/strings';
import {
  makeSelectCartItems,
  makeSelectCartPriceData,
  makeSelectFetchCartItemsError,
  makeSelectFetchCartPriceError,
} from '../../store/cart';
import {
  processOrder,
  makeSelectIsProcessingOrder,
  makeSelectProcessOrderError,
} from '../../store/orders';

const Clearfix = styled.div`
  margin-top: 10px;
  clear: both;
`;

const ButtonsRow = styled(Row)`
  margin-right: 0;

  @media (min-width: ${device.mobileS}) {
    margin-left: -15px;
  }

  @media (max-width: ${device.tablet}) {
    margin-left: 0;
  }
`;

const PlaceOrderBtn = styled(Button)`
  width: 100%;
  margin: 0;
  font-weight: 700;
  text-transform: uppercase;
  color: ${() => colors.product.actionButtonText};
  border-color: ${() => colors.product.actionButtonBorder};
  background-color: ${() => colors.product.actionButton};

  :hover {
    color: ${() => colors.product.actionButtonHoverText};
    border-color: ${() => colors.product.actionButtonHoverBorder};
    background-color: ${() => colors.product.actionButtonHover}
  }
`;

const ContinueShoppingBtn = styled(Link)`
  margin: 0;
  margin-top: 10px;
  width: 100%;
  text-align: center;
  font-weight: 700;
  text-transform: uppercase;
`;

const PlaceOrderButton = (props) => {
  const checkoutStrings = strings.pages.checkout();
  const [validationError, setValidationError] = useState('');
  const {
    cartItems, cartPrice, placeOrder, billingDataGetter,
    isPlacingOrder, orderPlacementError,
    fetchCartItemsError, fetchCartPriceError
  } = props;

  function processOrderPlacement() {
    const billingData = billingDataGetter();

    if(billingData.error) {
      setValidationError(billingData.message);
      return;
    } else {
      setValidationError('');
      const { billingAddress, paymentMethod, paymentCard } = billingData;
      const orderData = {
        orderItems : cartItems,
        orderSubTotal : cartPrice.subTotal,
        orderGrandTotal : cartPrice.grandTotal,
        billingAddressData : billingAddress,
        paymentCardData : paymentCard,
        paymentMethod: paymentMethod
      };

      placeOrder(orderData);
    }
  }

  if(fetchCartItemsError || fetchCartPriceError || orderPlacementError) {
    const {
      placeOrderError,
      getCartItemsError,
      getCartPriceError,
    } = checkoutStrings;

    const statusMessage = fetchCartItemsError
      ? getCartItemsError
      : fetchCartPriceError ? getCartPriceError : placeOrderError;

    return (
      <>
        <Clearfix />
        <Error>{statusMessage}</Error>
        <Clearfix />
        <ButtonsRow>
          <PlaceOrderBtn float="right" className='disabled'>
            {checkoutStrings.placeOrder}
          </PlaceOrderBtn>
          <ContinueShoppingBtn to='/'>
            {checkoutStrings.continueShopping}
          </ContinueShoppingBtn>
        </ButtonsRow>
      </>
    );
  }

  if(cartItems.length === 0) {
    return (
      <div>
        <p>Your cart is currently empty</p>
        <p>
          <Link to="/">Browser our shop</Link>
          &nbsp;
          to add items to your cart
        </p>
      </div>
    );
  }

  return (
    <>
      <Clearfix />
      <Error>{validationError}</Error>
      <ButtonsRow>
        <PlaceOrderBtn
          float="right"
          disabled={isPlacingOrder}
          onClick={() => processOrderPlacement() }
          className={'action-btn' +
            (isPlacingOrder ? ' btn-processing' : '')}
          title={checkoutStrings.placeOrderButton.title}>
          {checkoutStrings.placeOrderButton.text}
        </PlaceOrderBtn>
        <ContinueShoppingBtn to='/'>
          {checkoutStrings.continueShopping}
        </ContinueShoppingBtn>
      </ButtonsRow>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  placeOrder: (orderData) => dispatch(processOrder(orderData)),
});

const mapStateToProps = createStructuredSelector({
  isPlacingOrder: makeSelectIsProcessingOrder(),
  orderPlacementError: makeSelectProcessOrderError(),
  fetchCartItemsError: makeSelectFetchCartItemsError(),

  // calls to fetch cart items and cart price
  // are dispacthed by OrderReview component.
  // We are only interested in using the relevant values in this component
  cartItems: makeSelectCartItems(),
  cartPrice: makeSelectCartPriceData(),
  fetchCartPriceError: makeSelectFetchCartPriceError(),
});

PlaceOrderButton.propTypes = {
  placeOrder: PropTypes.func,
  isPlacingOrder: PropTypes.bool,
  orderPlacementError: PropTypes.string,

  // This comes from the parent component,
  // It should return either:
  // 1. To prevent submitting the order placement:
  //    - An object with two properties:
  //      - error: boolean
  //      - message: string
  // 2. To proceed with order placement:
  //    - the payment method (required)
  //    - billing address and credit card data
  //      (optional if payment method is not credit card)
  billingDataGetter: PropTypes.func,

  // This also comes from the parent
  // Returns the error message to be displayed if validation fails
  orderPlacementValidator: PropTypes.func,

  // OrderReview component dispatches the calls to fetch cart items and price
  // We only check for their existence and status in this component.
  cartItems: PropTypes.array,
  cartPrice: PropTypes.shape({
    subTotal: PropTypes.string,
    grandTotal: PropTypes.string,
  }),
  fetchCartItemsError: PropTypes.string,
  fetchCartPriceError: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrderButton);
