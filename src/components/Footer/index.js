import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import config from '../../config';
import colors from '../../resources/colors';
import strings from '../../resources/strings';

import {
  BehanceIcon, FacebookIcon, TwitterIcon, InstagramIcon
} from './social-icons';

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

const ProductLink = styled(Link)`
  display: inline-block;
  margin-bottom: 8px;
  color: ${() => colors.footer.productLinkColor};

  :hover{
    color: ${() => colors.footer.productLinkHoverColor};
  }
`;

const ProductName = styled.strong`
  display: inline-block;
  margin-right: 5px;
  color: ${() => colors.footer.productLink};

  :hover{
    color: ${() => colors.footer.productLinkHover};
  }
`;

const ProductImage = styled.img`
  width: 100px;
  margin-right: 10px;
  float: left;
`;

const Paragraph = styled.p`
  color: ${colors.footer.text};
`;

const Div = styled.div``;

const Logo = styled.img.attrs(props => ({
  src: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/64px-React-icon.svg.png",
  alt: "Site Logo"
}))``;

const UnorderedList = styled.ul`
  margin-right: 20px;
`;

const ListItem = styled.li``;

function SocialLink({url, icon}) {
  const Icon = icon;
  return (
    <ListItem className="list-inline-item">
      <a href={url}>
        <Icon />
      </a>
    </ListItem>
  );
}

function RecentProduct({id, name, dateAdded, imageUrl}) {
  let productpage = `/products/${id}`;

  return (
    <ProductLink to={productpage}>
      <Div className="d-flex align-items-center" padding="0">
        <Div padding="10px 0 0 0">
          <ProductImage src={imageUrl} alt={name} className="img-fluid" />
          <ProductName>{name} <br /> {dateAdded}</ProductName>
        </Div>
      </Div>
    </ProductLink>
  );
}

class Footer extends React.Component {
  render() {
    const { latestProducts } = {
      latestProducts: [
        {
          "id": 1,
          "name": "First Item",
          "price": 10.00,
          "color": "red",
          "size": "XS",
          "brand": "Abercrombie & Fitch",
          "dateAdded": "",
          "images": [
            { "url": "https://imgur.com/3u2mj7h.png", "default": true },
            { "url": "https://imgur.com/dV36lmS.png", "default": false },
            { "url": "https://imgur.com/3u2mj7h.png", "default": false }
          ]
        },
        {
          "id": 2,
          "name": "Second Item",
          "price": 10.00,
          "color": "green",
          "size": "XS",
          "brand": "Abercrombie & Fitch",
          "dateAdded": "",
          "images": [
            { "url": "https://imgur.com/3u2mj7h.png", "default": false },
            { "url": "https://imgur.com/dV36lmS.png", "default": true },
            { "url": "https://imgur.com/3u2mj7h.png", "default": false }
          ]
        },
        {
          "id": 3,
          "name": "Third Item",
          "price": 10.00,
          "color": "red",
          "size": "XS",
          "brand": "Abercrombie & Fitch",
          "dateAdded": "",
          "images": [
            { "url": "https://imgur.com/3u2mj7h.png", "default": false },
            { "url": "https://imgur.com/dV36lmS.png", "default": false },
            { "url": "https://imgur.com/3u2mj7h.png", "default": true }
          ]
        }
      ]
    };

    const latestProductsList = latestProducts.map(
      ({id, name, dateAdded, images}, i) => {
        const defaultImage = images.filter(img => img.default === true).pop();

        return (
          <RecentProduct
            key={i}
            id={id}
            name={name}
            dateAdded={dateAdded}
            imageUrl={defaultImage.url} />
        )
      }
    );

    return (
      <FooterContainer>
        <Container>
         <Row>
           <Col md="4">
             <Header className="text-white">
               <Link to="/">
                 {strings.appName}<br />
                 <Logo />
               </Link>
             </Header>
             <Paragraph>01 Street, City, State 11111</Paragraph>
             <Paragraph>Phone: (+000) 123 456 789</Paragraph>
             <Paragraph>Email: <a href={`mailto:${config.email}`}>
              {`${config.email}`}</a>
             </Paragraph>
             <UnorderedList className="list-unstyled list-inline">
               <SocialLink url="" icon={FacebookIcon} />
               <SocialLink url="" icon={TwitterIcon} />
               <SocialLink url="" icon={InstagramIcon} />
               <SocialLink url="" icon={BehanceIcon} />
             </UnorderedList>
           </Col>
           <Col md="4">
             <Div className="menus d-flex">
              <UnorderedList className="list-unstyled">
                <ListItem block><a href="">About</a></ListItem>
                <ListItem block><a href="">Pricing</a></ListItem>
                <ListItem block><a href="">Privacy</a></ListItem>
              </UnorderedList>
              <UnorderedList className="list-unstyled">
                <ListItem block><a href="">Partners</a></ListItem>
                <ListItem block><a href="">FAQ</a></ListItem>
                <ListItem block><a href="">Contact</a></ListItem>
              </UnorderedList>
             </Div>
           </Col>
           <Col md="4">
            <Header>Latest Products</Header>
            { latestProductsList }
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
                <a href="" className="text-white">Michael Orji</a>
              </Paragraph>
            </Col>
          </Row>
        </Container>
      </FooterContainer>
    );
  }
}

export default Footer;
