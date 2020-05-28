import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Col, Row, Button } from 'react-bootstrap';
import colors from '../../resources/colors';
import CartData from './Cart';
import EmptyCartButton from './EmptyCartButton';

const Center = styled.div`
  padding: 0;
  margin: 0;
  text-align: center;
`;

const CheckoutButton = styled(Button)`
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

const Clearfix = styled.div`
  clear: both;
`;

const Cart = () => (
  <Row>
    <Col md="12" role="main-content">
      <CartData />
      <Clearfix />
      <Center>
        <EmptyCartButton />
        <CheckoutButton as={Link} to="/checkout" className="btn btn-primary">
          Checkout
        </CheckoutButton>
      </Center>
    </Col>
  </Row>
);

export default Cart;
