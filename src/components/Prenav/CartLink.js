import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import CartIcon from './CartIcon';

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

export default () => {
  const cartItemsCount = Math.floor(Math.random() * 2); // TO DO: get this dynamically

  if(cartItemsCount === 0) {
    return <>&nbsp;</>
  }

  return (
    <div
      title={`${cartItemsCount} items in your cart`}
      className="d-flex justify-content-end align-items-center">
      <CartItems>
        {cartItemsCount}
      </CartItems>
      <CartLink to="/cart">
        <CartIcon />
      </CartLink>
    </div>
  )
}
