import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Product = () => {
  return (
    <Row>
      <Col md="3" role="sidebar">
        Sidebar
      </Col>
      <Col md="9" role="main-content">
        Product details page
      </Col>
    </Row>
  );
};

export default Product;
