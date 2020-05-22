import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../../resources/colors';

const ProductLink = styled(Link)`
  display: inline-block;
  margin-bottom: 8px;
  color: ${() => colors.footer.productLink};

  :hover{
    color: ${() => colors.footer.productLinkHover};
  }
`;

const ProductInfo = styled.strong`
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

const ProductView = ({id, name, dateAdded, imageUrl}) => {
  let productpage = `/products/${id}`;

  return (
    <ProductLink to={productpage} role={`recent-product-${id}-container`}>
      <div className="d-flex align-items-center" padding="0">
        <div padding="10px 0 0 0">
          { /* eslint-disable-next-line */ }
          <ProductImage src={imageUrl} alt={name} role="product-image"
            className="img-fluid" />
          <ProductInfo>
            { /* eslint-disable-next-line */ }
            <span role="product-name">{name}</span>
            <br />
            <span>{dateAdded}</span>
          </ProductInfo>
        </div>
      </div>
    </ProductLink>
  );
};

const RecentProducts = ({ productsList }) => {
  if(productsList && !Array.isArray(productsList)) {
    return null;
  }

  const latestProducts = productsList || [
    {
      'id': 1,
      'name': 'First Item',
      'price': 10.00,
      'color': 'red',
      'size': 'XS',
      'brand': 'Abercrombie & Fitch',
      'dateAdded': '',
      'images': [
        { 'url': 'https://imgur.com/3u2mj7h.png', 'default': true },
        { 'url': 'https://imgur.com/dV36lmS.png', 'default': false },
        { 'url': 'https://imgur.com/3u2mj7h.png', 'default': false }
      ]
    },
    {
      'id': 2,
      'name': 'Second Item',
      'price': 10.00,
      'color': 'green',
      'size': 'XS',
      'brand': 'Abercrombie & Fitch',
      'dateAdded': '',
      'images': [
        { 'url': 'https://imgur.com/3u2mj7h.png', 'default': false },
        { 'url': 'https://imgur.com/dV36lmS.png', 'default': true },
        { 'url': 'https://imgur.com/3u2mj7h.png', 'default': false }
      ]
    },
    {
      'id': 3,
      'name': 'Third Item',
      'price': 10.00,
      'color': 'red',
      'size': 'XS',
      'brand': 'Abercrombie & Fitch',
      'dateAdded': '',
      'images': [
        { 'url': 'https://imgur.com/3u2mj7h.png', 'default': false },
        { 'url': 'https://imgur.com/dV36lmS.png', 'default': false },
        { 'url': 'https://imgur.com/3u2mj7h.png', 'default': true }
      ]
    }
  ];

  return latestProducts.map(
    ({id, name, dateAdded, images}, index) => {
      const defaultImage = images.filter(img => img.default === true).pop();

      return (
        <ProductView
          key={index}
          id={id}
          name={name}
          dateAdded={dateAdded}
          imageUrl={defaultImage.url} />
      );
    }
  );
};

ProductView.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  dateAdded: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
};

RecentProducts.propTypes = {
  productsList: PropTypes.array,
};

export default RecentProducts;
