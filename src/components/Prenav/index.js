import React from 'react';
import styled from 'styled-components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CartLink from './CartLink';
import UserLink from './UserLink';

const Header = styled.header`
  margin-top: 10px;
  margin-bottom: 0;
  padding-bottom: .2rem !important;
`;

export default () => (
  <Header className="py-3">
    <Row className="flex-nowrap justify-content-between align-items-center">
      <Col md="4" className="pt-1">
        <UserLink />
      </Col>
      <Col md="4" className="text-center">&nbsp;</Col>
      <Col md="4">
        <CartLink />
      </Col>
    </Row>
  </Header>
);
