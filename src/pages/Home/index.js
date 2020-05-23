import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ProductsList from '../../components/Products/ProductsList';

const Home = () => (
  <Row>
    <Col md="3" role="sidebar">
      Sidebar
    </Col>
    <Col md="9" role="main-content">
      <Row role="products-list-container">
        <ProductsList weight="4" />
      </Row>
    </Col>
  </Row>
);

export default Home;
