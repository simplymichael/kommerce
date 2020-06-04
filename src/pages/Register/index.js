import React from 'react';
import styled from 'styled-components';
import { Col, Row, Container } from 'react-bootstrap';
import RegistrationPage from './Register';

const AuthContainer = styled(Container)`
  background: #fff;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 3px;
`;

const Register = () => {
  return (
    <Row>
      <Col md="3" role="sidebar"></Col>
      <Col md="6" role="main-content">
        <AuthContainer>
          <RegistrationPage />
        </AuthContainer>
      </Col>
    </Row>
  );
};

export default Register;
