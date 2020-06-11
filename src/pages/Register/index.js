import React from 'react';
import styled from 'styled-components';
import { Col, Container } from 'react-bootstrap';
import Layout from '../../components/Layout';
import RegistrationPage from './Register';
import strings from '../../resources/strings';

const AuthContainer = styled(Container)`
  background: #fff;
  padding-top: 15px;
  padding-bottom: 15px;
  border-radius: 3px;
`;

const Register = () => {
  return (
    <Layout pageMeta={strings.pages.registration().pageMeta}>
      <Col md="3" role="sidebar"></Col>
      <Col md="6" role="main-content">
        <AuthContainer>
          <RegistrationPage />
        </AuthContainer>
      </Col>
    </Layout>
  );
};

export default Register;
