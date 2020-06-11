import React from 'react';
import { Link } from 'react-router-dom';
import { Col } from 'react-bootstrap';
import Layout from '../../components/Layout';
import strings from '../../resources/strings';

const NotFound = () => {
  return (
    <Layout pageMeta={strings.pages.notFound().pageMeta}>
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
    </Layout>
  );
};

export default NotFound;
