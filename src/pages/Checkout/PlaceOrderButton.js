import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Row, Button } from 'react-bootstrap';
import device from '../../utils/device';
import colors from '../../resources/colors';
import strings from '../../resources/strings';
import {
  makeSelectCartItems,
  makeSelectFetchCartItemsError,
  makeSelectFetchCartPriceError,
} from '../../store/cart';
import {
  processOrder,
  makeSelectIsProcessingOrder,
  makeSelectProcessOrderError,
} from '../../store/orders';

const Clearfix = styled.div`
  clear: both;
`;

const OrderStatus = styled.p`
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  margin-top: 10px;
  color: ${() => colors.page.success};

  ${props => props.className === 'error' && css`
    color: ${colors.page.error};
  `}
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
  const {
    cartItems,
    isProcessingOrder,
    processOrderError,
    fetchCartItemsError,
    fetchCartPriceError,
  } = props;

  let status = '';
  let statusMessage = '';

  if(fetchCartPriceError) {
    status = 'error';
    statusMessage = strings.checkout.cartPriceError;
  } else if(processOrderError) {
    status = 'error';
    statusMessage = strings.checkout.placeOrderError;
  }

  return (
    <>
      <OrderStatus className={status}>{statusMessage}</OrderStatus>
      <Clearfix />
      <ButtonsRow>
        { // If there are NO errors loading or returning count of cart items,
          // and the user has items in their cart,
          // display the checkout button
          !fetchCartItemsError && cartItems.length > 0 &&
          <PlaceOrderBtn
            float="right"
            onClick={() => this.processCheckout()}
            className={isProcessingOrder ? 'processing disabled' : ''}>
            {strings.checkout.placeOrder}
          </PlaceOrderBtn>
        }
        <ContinueShoppingBtn to='/'>
          {strings.checkout.continueShopping}
        </ContinueShoppingBtn>
      </ButtonsRow>
    </>
  );
};

const mapDispatchToProps = dispatch => ({
  processOrder: (orderData) => dispatch(processOrder(orderData)),
});

const mapStateToProps = createStructuredSelector({
  cartItems: makeSelectCartItems(),
  isProcessingOrder: makeSelectIsProcessingOrder(),
  processOrderError: makeSelectProcessOrderError(),
  fetchCartItemsError: makeSelectFetchCartItemsError(),
  fetchCartPriceError: makeSelectFetchCartPriceError(),
  //countCartItemsError: makeSelectCountCartItemsError(),
});

PlaceOrderButton.propTypes = {
  processOrder: PropTypes.func,
  isProcessingOrder: PropTypes.bool,
  processOrderError: PropTypes.string,

  // OrderReview component dispatches the calls to fetch cart items and price
  // We only check for their existence and status in this component.
  cartItems: PropTypes.array,
  fetchCartItemsError: PropTypes.string,
  fetchCartPriceError: PropTypes.string,
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaceOrderButton);
