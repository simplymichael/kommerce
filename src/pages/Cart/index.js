import React from 'react';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';
import CartData from './Cart';
import EmptyCartButton from './EmptyCartButton';
import CheckoutButton from './CheckoutButton';

const Center = styled.div`
  padding: 0;
  margin: 0;
  text-align: center;
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
        <span style={{ display: 'inlineBlock', marginRight: '5px' }}>
          &nbsp;
        </span>
        <CheckoutButton />
      </Center>
    </Col>
  </Row>
);

export default Cart;
