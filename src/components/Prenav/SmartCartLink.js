import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { CartIcon } from '../Icons';

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

const SmartCartLink = ({ itemsCount }) => {
  itemsCount = itemsCount || Math.floor(Math.random() * 2);

  if(itemsCount === 0) {
    return <>&nbsp;</>
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
  )
}

SmartCartLink.propTypes = {
  itemsCount: PropTypes.number,
}

export default SmartCartLink;
