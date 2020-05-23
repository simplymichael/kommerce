import React from 'react';
import { Col, Row } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Row>
      <Col md="3" role="sidebar">
        Sidebar
      </Col>
      <Col md="9" role="main-content">
        404: Page Not Found
      </Col>
    </Row>
  );
};

export default NotFound;
