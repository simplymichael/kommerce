import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import config from '../../.config';
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

const currYear = new Date().getFullYear();
const footerDate = currYear > 2020 ? `2020 - ${currYear}` : currYear;

const Footer = () => (
  <FooterContainer role="footer">
    <Container>
      <Row>
        <Col md="4">
          <Header className="text-white">
            <Link to="/">
              {strings.appName}<br />
              <Logo width="64px" height="45px" />
            </Link>
          </Header>
          <Paragraph>{config.business.address}</Paragraph>
          <Paragraph>Phone: {config.business.phone}</Paragraph>
          <Paragraph>Email:&nbsp;
            <a href={`mailto:${config.business.email}`}>
              {`${config.business.email}`}
            </a>
          </Paragraph>
          <SocialLinks
            behance_url={config.social.behance.url}
            facebook_url={config.social.facebook.url}
            twitter_url={config.social.twitter.url}
            instagram_url={config.social.instagram.url} />
        </Col>
        <Col md="4">
          <SecondaryPages />
        </Col>
        <Col md="4">
          <Header>{strings.footer.productsHeader}</Header>
          { /* eslint-disable-next-line */ }
          <div role="footer-recent-products-list-container">
            <RecentProducts />
          </div>
        </Col>
      </Row>
    </Container>
    <Container>
      <Row>
        <Col md="6">
          <Paragraph>
            &copy; {footerDate}. All rights reserved. {strings.appName}.
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

export default Footer;
