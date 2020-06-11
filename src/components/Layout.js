import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Row from 'react-bootstrap/Row';
import Prenav from './Prenav';
import MainNavigation from './MainNavigation';
import Footer from './Footer';
import strings from '../resources/strings';

const Clearfix = styled.div`
  clear: both;
`;

const Layout = ({ pageMeta, children }) => (
  <>
    <Helmet>
      <title>{`${strings.appName} - ${pageMeta.title}`}</title>

      <meta name="description" content={pageMeta.description} />
      <meta name="keywords" content={pageMeta.keywords.join(', ')} />
    </Helmet>
    <Prenav />
    <MainNavigation />
    <Row>
      {children}
    </Row>
    <Clearfix />
    <Footer />
  </>
);

Layout.propTypes = {
  pageMeta: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    keywords: PropTypes.array.isRequired,
  }),
  children: PropTypes.node,
};

export default Layout;
