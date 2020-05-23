import React from 'react';
import { Col, Row } from 'react-bootstrap';

const About = () => {
  return (
    <Row>
      <Col md="3" role="sidebar">
        Sidebar
      </Col>
      <Col md="9" role="main-content">
        About us page
      </Col>
    </Row>
  );
};

export default About;
