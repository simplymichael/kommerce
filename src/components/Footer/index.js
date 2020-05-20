import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import config from '../../config';
import colors from '../../resources/colors';
import strings from '../../resources/strings';
import Logo from '../Logo';
import RecentProducts from './RecentProducts';
import SocialLinks from './SocialLinks';
import SecondaryPages from './SecondaryPages';

const FooterContainer = styled.footer`
  display: block;
  width: 100%;
  padding: 15px;
  margin-top: 15px;
  margin-bottom: 5px;
  color: ${() => colors.footer.text};
  background: ${() => colors.footer.background};
`;

const Header = styled.h5`
  margin-bottom: 10px;
  padding: 0;
  color: ${() => colors.footer.headerColor};
`;

const Paragraph = styled.p`
  color: ${colors.footer.text};
`;

export default () => (
  <FooterContainer>
    <Container>
      <Row>
        <Col md="4">
          <Header className="text-white">
            <Link to="/">
              {strings.appName}<br />
              <Logo width="64px" height="45px" />
            </Link>
          </Header>
          <Paragraph>01 Street, City, State 11111</Paragraph>
          <Paragraph>Phone: (+000) 123 456 789</Paragraph>
          <Paragraph>Email:&nbsp;
            <a href={`mailto:${config.email}`}>{`${config.email}`}</a>
          </Paragraph>
          <SocialLinks />
        </Col>
        <Col md="4">
          <SecondaryPages />
        </Col>
        <Col md="4">
          <Header>Latest Products</Header>
          <RecentProducts />
        </Col>
      </Row>
    </Container>
    <Container>
      <Row>
        <Col md="6">
          <Paragraph>
            &copy; 2020. All rights reserved. {strings.appName}.
          </Paragraph>
        </Col>
        <Col md="6" className="text-right">
          <Paragraph>
            Responsive React-Bootstrap E-commerce Template By&nbsp;
            <a href="https://github.com/simplymichael" className="text-white">
              Simplymichael
            </a>
          </Paragraph>
        </Col>
      </Row>
    </Container>
  </FooterContainer>
);
