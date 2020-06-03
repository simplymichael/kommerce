import React from 'react';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SmartCartLink from './SmartCartLink';
import UserLink from './UserLink';

import SearchForm from '../SearchForm';

const Header = styled.header`
  margin-top: 10px;
  margin-bottom: 0;
  padding-bottom: .2rem !important;
`;

const Prenav = () => (
  <Header className="py-3" role="prenav-header">
    <Row className="flex-nowrap justify-content-between align-items-center">
      <Col md="3" className="pt-1">
        <UserLink />
      </Col>
      <Col md="7" className="text-center">
        <SearchForm />
      </Col>
      <Col md="2">
        <SmartCartLink />
      </Col>
    </Row>
  </Header>
);

export default Prenav;
