import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Cart = () => {
  return (
    <Row>
      <Col md="3" role="sidebar">
        Sidebar
      </Col>
      <Col md="9" role="main-content">
        Cart page
      </Col>
    </Row>
  );
};

export default Cart;
