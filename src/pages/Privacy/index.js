import React from 'react';
import { Col, Row } from 'react-bootstrap';

const Privacy = () => {
  return (
    <Row>
      <Col md="3" role="sidebar">
        Sidebar
      </Col>
      <Col md="9" role="main-content">
        Privacy policy page
      </Col>
    </Row>
  );
};

export default Privacy;
