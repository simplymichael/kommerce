import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

const NotFound = () => {
  return (
    <Row>
      <Col md="3" role="sidebar"></Col>
      <Col md="9" role="main-content">
        <p>
          Oops!!!
          It looks like we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <p>
          <Link to="/" role="back-to-home-link">Click here</Link>&nbsp;
          to get back to the home page.
        </p>
      </Col>
    </Row>
  );
};

export default NotFound;
