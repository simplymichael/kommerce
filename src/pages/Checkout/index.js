import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Checkout = () => {
  return (
    <Row>
      <Col md="3" role="sidebar">
        Sidebar
      </Col>
      <Col md="9" role="main-content">
        Checkout page
      </Col>
    </Row>
  );
};

export default Checkout;
