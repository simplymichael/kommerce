import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import Loading from '../../components/Notifications/Loading';
import { Info, Error } from '../../components/Notifications';
import StarRating from '../../components/StarRating';
import colors from '../../resources/colors';
import strings from '../../resources/strings';
import { formatTime } from '../../utils/date';
import {
  fetchProductReviews,
  makeSelectProductReviews,
  makeSelectIsFetchingProductReviews,
  makeSelectFetchProductReviewsError,
} from '../../store/product-reviews';

const HR = styled.hr`
  width: ${props => props.width || '100%'};
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid ${colors.page.separator};
`;

const Clearfix = styled.div`
  clear: both;
`;

const ProductReview = ({ review }) => {
  const { author, dateAdded, body, rating } = review;

  return (
    <Row>
      <Col md="3">
        <p title="author">{author}</p>
        <div title={`Rating: ${rating}`}>
          <StarRating fixed currentRating={rating} maxPossibleRating={5} />
        </div>
        <Clearfix />
        <span style={{color: colors.names.gray}}>
          {dateAdded && formatTime(dateAdded)}
        </span>
      </Col>
      <Col md="9">
        <p>
          {body}
        </p>
      </Col>
      <Clearfix />
      <HR />
    </Row>
  );
};

class ProductReviews extends React.Component {
  componentDidMount() {
    this.props.fetchProductReviews(this.props.productId);
  }

  render() {
    const {
      productReviews,
      isFetchingProductReviews,
      fetchProductReviewsError
    } = this.props;
    const productStrings = strings.pages.product({});

    if(isFetchingProductReviews) {
      return (
        <div style={{
          width: '100px',
          margin: 'auto',
        }}>
          <Loading width="100px" height="100px" color="#aaa" opacity="0.5"
            role="product-reviews-loading-indicator" />
        </div>
      );
    }

    if(fetchProductReviewsError) {
      return (
        <Error>
          {productStrings.reviews.fetchReviewsError ||
            fetchProductReviewsError
          }
        </Error>
      );
    }

    if(!productReviews || productReviews.length === 0) {
      return (
        <Info>
          {productStrings.reviews.noReviewsYet}
        </Info>
      );
    }

    return productReviews.map((review, i) => {
      return <ProductReview key={i} review={review} />;
    });
  }
}

ProductReview.propTypes = {
  review: PropTypes.shape({
    author: PropTypes.string,
    dateAdded: PropTypes.number,
    body: PropTypes.string,
    rating: PropTypes.number,
  })
};

ProductReviews.propTypes = {
  productId: PropTypes.number,
  productReviews: PropTypes.array,
  fetchProductReviews: PropTypes.func,
  isFetchingProductReviews: PropTypes.bool,
  fetchProductReviewsError: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  fetchProductReviews: (productId) => dispatch(fetchProductReviews(productId)),
});

const mapStateToProps = createStructuredSelector({
  productReviews: makeSelectProductReviews(),
  isFetchingProductReviews: makeSelectIsFetchingProductReviews(),
  fetchProductReviewsError: makeSelectFetchProductReviewsError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviews);
