import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Faq = () => {
  return (
    <Row>
      <Col md="3" role="sidebar">
        Sidebar
      </Col>
      <Col md="9" role="main-content">
        FAQ page
      </Col>
    </Row>
  );
};

export default Faq;
