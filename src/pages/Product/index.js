import React, { useState } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';
import ProductDetails from './ProductDetails';
import colors from '../../resources/colors';
import strings from '../../resources/strings';
import { PlusIcon, MinusIcon } from '../../components/Icons';
import ProductReviews from './ProductReviews';
import ProductReviewForm from './ProductReviewForm';

const productColors = colors.product;

const DetailsContainer = styled.div`
  padding: 15px;
  width: 100%;
  border-bottom: none;
  border: 1px solid ${() => productColors.border};
  background: ${() => productColors.background};

  -webkit-box-shadow: 0 0 1px 0 ${() => productColors.shadow};
  -moz-box-shadow:    0 0 1px 0 ${() => productColors.shadow};
  box-shadow:         0 0 1px 0 ${() => productColors.shadow};
`;

const ReviewsContainer = styled.div`
  padding: 15px;
  width: 100%;
  border: 1px solid #ddd;
  margin-top: 1px;
  margin-bottom: 1px;
  color: ${() => colors.page.textColor};

  -webkit-box-shadow: 0 0 1px 0 ${() => colors.product.shadowColor};
  -moz-box-shadow:    0 0 1px 0 ${() => colors.product.shadowColor};
  box-shadow:         0 0 1px 0 ${() => colors.product.shadowColor};
`;

const Header = styled.h5`
  font-size: 20px;
  color: ${() => colors.headers.h5};
`;

const SmallHeader = styled.small`
  float: right;
  cursor: pointer;
  font-size: 12px;
  display: inline-block;
`;

const Product = (props) => {
  const [showReviews, setShowReviews] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(true);

  //eslint-disable-next-line
  const productId = parseInt(props.match.params.id, 10);

  return (
    <Row>
      <Col md="12" role="main-content">
        <DetailsContainer role="product-details-container">
          <ProductDetails productId={productId} />
        </DetailsContainer>
        <ReviewsContainer role="product-reviews-container">
          <Row>
            <Col md="12">
              <Header>
                {strings.product.reviews.header}
                <SmallHeader
                  title={(showReviews ? 'Hide' : 'Show') + ' reviews'}
                  onClick={() => setShowReviews(!showReviews)}>
                  { showReviews ? <MinusIcon /> : <PlusIcon /> }
                </SmallHeader>
              </Header>
              { showReviews && <ProductReviews productId={productId} /> }
            </Col>
            <Col md="12">
              <Header>
                {strings.product.reviews.addReviewHeader}
                <SmallHeader
                  title={(showReviewForm ? 'Hide' : 'Show') + ' review form'}
                  onClick={() => setShowReviewForm(!showReviewForm)}>
                  { showReviewForm ? <MinusIcon /> : <PlusIcon /> }
                </SmallHeader>
              </Header>
              { showReviewForm && <ProductReviewForm productId={productId} /> }
            </Col>
          </Row>
        </ReviewsContainer>
      </Col>
    </Row>
  );
};

export default Product;
