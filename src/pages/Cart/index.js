import React from 'react';
import styled from 'styled-components';
import { Col } from 'react-bootstrap';
import Layout from '../../components/Layout';
import CartData from './Cart';
import EmptyCartButton from './EmptyCartButton';
import CheckoutButton from './CheckoutButton';
import strings from '../../resources/strings';

const Center = styled.div`
  padding: 0;
  margin: 0;
  text-align: center;
`;

const Clearfix = styled.div`
  clear: both;
`;

const Cart = () => (
  <Layout pageMeta={strings.pages.cart().pageMeta}>
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
  </Layout>
);

export default Cart;
