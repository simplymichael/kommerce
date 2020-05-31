import React from 'react';
import styled from 'styled-components';
import { Col, Row, Container } from 'react-bootstrap';
import colors from '../../resources/colors';
import LoginPage from './Login';

const AuthContainer = styled(Container)`
   background: #fff;
   padding-top: 15px;
   padding-bottom: 15px;
   border-radius: 3px;

   -webkit-box-shadow: 1px 1px 10px 6px ${() => colors.product.shadowColor};
   -moz-box-shadow:    1px 1px 10px 6px ${() => colors.product.shadowColor};
   box-shadow:         1px 1px 10px 6px ${() => colors.product.shadowColor};
 `;

const Login = () => {
  return (
    <Row>
      <Col md="3" role="sidebar">
        Sidebar
      </Col>
      <Col md="6" role="main-content">
        <AuthContainer>
          <LoginPage />
        </AuthContainer>
      </Col>
    </Row>
  );
};

export default Login;
