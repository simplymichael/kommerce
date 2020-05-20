import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../resources/colors';

const ProductLink = styled(Link)`
  display: inline-block;
  margin-bottom: 8px;
  color: ${() => colors.footer.productLink};

  :hover{
    color: ${() => colors.footer.productLinkHover};
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

const RecentProduct = ({id, name, dateAdded, imageUrl}) => {
  let productpage = `/products/${id}`;

  return (
    <ProductLink to={productpage}>
      <div className="d-flex align-items-center" padding="0">
        <div padding="10px 0 0 0">
          <ProductImage src={imageUrl} alt={name} className="img-fluid" />
          <ProductName>
            {name}
            <br />
            {dateAdded}
          </ProductName>
        </div>
      </div>
    </ProductLink>
  );
}

export default ({ count }) => {
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

  return latestProducts.map(
    ({id, name, dateAdded, images}, index) => {
      const defaultImage = images.filter(img => img.default === true).pop();

      return (
        <RecentProduct
          key={index}
          id={id}
          name={name}
          dateAdded={dateAdded}
          imageUrl={defaultImage.url} />
      )
    }
  );
}
