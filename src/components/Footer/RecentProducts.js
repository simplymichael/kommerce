import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loading from '../Notifications/Loading';
import { Error } from '../Notifications';
import config from '../../config';
import colors from '../../resources/colors';
import strings from '../../resources/strings';
import { formatTime } from '../../utils/date';
import {
  fetchRecentProducts,
  makeSelectRecentProducts,
  makeSelectFetchRecentProductsError,
  makeSelectIsFetchingRecentProducts,
} from '../../store/products';

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
  height: 100px;
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
            <span>
              {formatTime(dateAdded)}
            </span>
          </ProductInfo>
        </div>
      </div>
    </ProductLink>
  );
};

const RecentProducts = (props) => {
  useEffect(() => {
    props.fetchProducts(config.products.recentCount || 3); // eslint-disable-next-line
  }, []);

  if(props.isFetchingProducts) {
    return (
      <div style={{
        width: '50px',
        margin: 'auto',
        marginTop: '50px',
      }}>
        <Loading width="50px" height="50px" color="#aaa" opacity="0.5"
          role="recent-products-loading-indicator" />
      </div>
    );
  }

  if(props.fetchProductsError) {
    return (
      <Error>
        {strings.footer.fetchRecentProductsError || props.fetchProductsError}
      </Error>
    );
  }

  if(!Array.isArray(props.products)) {
    return null;
  }

  return (props.products || []).map(
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
  dateAdded: PropTypes.number,
  imageUrl: PropTypes.string.isRequired,
};

RecentProducts.propTypes = {
  products: PropTypes.array,
  fetchProducts: PropTypes.func,
  fetchProductsError: PropTypes.string,
  isFetchingProducts: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  fetchProducts: (limit) => dispatch(fetchRecentProducts(limit)),
});

const mapStateToProps = createStructuredSelector({
  products: makeSelectRecentProducts(),
  isFetchingProducts: makeSelectIsFetchingRecentProducts(),
  fetchProductsError: makeSelectFetchRecentProductsError()
});

export default connect(mapStateToProps, mapDispatchToProps)(RecentProducts);
