import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CartIcon } from '../Icons';
import { Info, Error } from '../Notifications';
import strings from '../../resources/strings';
import {
  countCartItems,
  makeSelectCartItemsCount,
  makeSelectIsCountingCartItems,
  makeSelectCountCartItemsError,
} from '../../store/cart';

const CartLink = styled(Link)`
  padding: 1px 2px 1px 3px;
  border: 1px solid #ccc;
  border-radius: 50%;
  background: #f9f9f9;
`;

const CartItems = styled.span`
  display: inline-block;
  color: #f00;
  position: absolute;
  top: -4px;
  right: 8px;
  font-size: 12px;
  font-weight: 700;
`;

const SmartCartLink = (props) => {
  const {
    itemsCount,
    countCartItems,
    isCountingCartItems,
    countCartItemsError
  } = props;

  useEffect(() => {
    countCartItems(); // eslint-disable-next-line
  }, []);

  if(isCountingCartItems) {
    return (
      <div className="d-flex justify-content-end align-items-center">
        <Info>Loading...</Info>
      </div>
    );
  }

  if(countCartItemsError) {
    return(
      <div className="d-flex justify-content-end align-items-center">
        <Error>
          {strings.cart.countItemsError}
        </Error>
      </div>
    );
  }

  if(itemsCount === 0) {
    return <>&nbsp;</>;
  }

  return (
    <div
      title={`${itemsCount} items in your cart`}
      className="d-flex justify-content-end align-items-center">
      <CartItems>
        {itemsCount}
      </CartItems>
      <CartLink to="/cart">
        <CartIcon width="20" height="20" viewBox="0 0 28 28" />
      </CartLink>
    </div>
  );
};

SmartCartLink.propTypes = {
  itemsCount: PropTypes.number,
  countCartItems: PropTypes.func,
  isCountingCartItems: PropTypes.bool,
  countCartItemsError: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  countCartItems: () => dispatch(countCartItems()),
});

const mapStateToProps = createStructuredSelector({
  itemsCount: makeSelectCartItemsCount(),
  isCountingCartItems: makeSelectIsCountingCartItems(),
  countCartItemsError: makeSelectCountCartItemsError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SmartCartLink);
