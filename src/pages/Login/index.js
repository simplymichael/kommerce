import React from 'react';
import styled from 'styled-components';
import { Col, Row, Container } from 'react-bootstrap';
import LoginPage from './Login';

const AuthContainer = styled(Container)`
   background: #fff;
   padding-top: 15px;
   padding-bottom: 15px;
   border-radius: 3px;
 `;

const Login = () => {
  return (
    <Row>
      <Col md="3" role="sidebar"></Col>
      <Col md="6" role="main-content">
        <AuthContainer>
          <LoginPage />
        </AuthContainer>
      </Col>
    </Row>
  );
};

export default Login;
