import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Home = () => {
  return (
    <Row>
      <Col md="3">
        Sidebar
      </Col>
      <Col md="9">
        Main Content of page
      </Col>
    </Row>
  );
};

export default Home;
