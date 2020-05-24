import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import { Error } from '../../components/Notifications';
import productReviews from '../../__DATA__/product-reviews';
import colors from '../../resources/colors';

const P = styled.p``;

const HR = styled.hr`
  width: ${props => props.width || '100%'};
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid ${colors.page.separator};
`;

const Span = styled.span`
  display: 'inline-block';
`;

const Clearfix = styled.div`
  clear: both;
`;

const ProductReview = ({ review }) => {
  const { author, date, text, rating } = review;

  return (
    <Row>
      <Col md="3">
        <P title="rating">{rating}</P>
        <P title="author">{author}</P>
        <Span>{date}</Span>
      </Col>
      <Col md="9">
        <P>{text}</P>
      </Col>
      <Clearfix />
      <HR />
    </Row>
  );
};

class ProductReviews extends React.Component {
  render() {
    let { reviews } = this.props;
    const { error } = this.props;

    reviews = reviews || productReviews;

    if(error) {
      return <Error message={error} />;
    }

    return reviews.map((review, i) => {
      return <ProductReview key={i} review={review} />;
    });
  }
}

ProductReview.propTypes = {
  review: PropTypes.shape({
    author: PropTypes.string,
    date: PropTypes.string,
    text: PropTypes.string,
    rating: PropTypes.number,
  })
};

ProductReviews.propTypes = {
  error: PropTypes.string,
  productId: PropTypes.number,
  reviews: PropTypes.array,
  getProductReviews: PropTypes.func,
};

export default ProductReviews;
