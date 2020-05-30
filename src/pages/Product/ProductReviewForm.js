import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Col, Row, Button } from 'react-bootstrap';
import device from '../../utils/device';
import colors from '../../resources/colors';
import strings from '../../resources/strings';
import { Error } from '../../components/Notifications';
import StarRating from '../../components/StarRating';
import {
  addProductReview,
  makeSelectIsAddingProductReview,
  makeSelectAddProductReviewError,
} from '../../store/product-reviews';

const Clearfix = styled.div`
  clear: both;
`;

const ReviewForm = styled.form`
  width: 100%;
  padding: 0;
`;

const Input = styled.input`
  outline: none;
  min-height: 10px;
  padding: 10px;
  border-radius: .3em;
  border: 1px solid #ccc;
`;

const Textarea = styled.textarea`
  resize: vertical;
  min-height: 10px;
  padding: 10px;
  border-radius: .3em;
  border: 1px solid #ccc;
`;

const NameInput = styled(Input).attrs(() => ({
  type: 'text'
}))`
  width: 100%;
  margin-bottom: 5px;

  @media (min-width: ${device.laptop}) {
    width: 50%;
  }
`;

const ReviewInput = styled(Textarea)`
  width: 100%;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 100px;
`;

const InputLabel = styled.label`
  display: inline-block;
  vertical-align: top;
`;

const SubmitBtn = styled(Input).attrs(() => ({
  type: 'submit',
}))`
  float: right;
  margin: 0;
  color: ${() => colors.product.actionButtonText};
  border-color: ${() => colors.product.actionButtonBorder};
  background-color: ${() => colors.product.actionButton};

  :hover {
    color: ${() => colors.product.actionButtonHoverText};
    border-color: ${() => colors.product.actionButtonHoverBorder};
    background-color: ${() => colors.product.actionButtonHover}
  }
`;

class ProductReviewForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
      reviewText: '',
      authorName: '',
      validationError: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    const { productId, addProductReview } = this.props;
    const requiredData = {
      authorName: 'Name',
      reviewText: 'Review',
    };

    for(let [key, value] of Object.entries(requiredData)) {
      if(!this.state[key]) {
        this.setState({
          validationError: `The ${value} field is required`,
        });

        return;
      }
    }

    const { authorName, reviewText, rating } = this.state;
    addProductReview(productId, {
      author: authorName,
      body: reviewText,
      rating: rating
    });
  }

  handleInputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleRatingClick(ratingValue) {
    this.setState({ rating: ratingValue });
  }

  render() {
    const { isAddingProductReview, addProductReviewError } = this.props;
    const { authorName, reviewText, rating, validationError } = this.state;
    let error = validationError;

    if(addProductReviewError) {
      error = strings.product.reviews.addReviewError || addProductReviewError;
    }

    return (
      <>
        <Error>{error}</Error>
        <ReviewForm onSubmit={evt => this.handleSubmit(evt)}>
          <Row>
            <Col md="3">
              <InputLabel>Name:</InputLabel>
            </Col>
            <Col md="9">
              <NameInput name="authorName" value={authorName}
                onChange={evt => this.handleInputChange(evt)} />
            </Col>
          </Row>
          <Row>
            <Col md="3">
              <InputLabel>Your Review:</InputLabel>
            </Col>
            <Col md="9">
              <ReviewInput name="reviewText" value={reviewText}
                onChange={evt => this.handleInputChange(evt)} />
            </Col>
          </Row>
          <Row>
            <Col md="3"><InputLabel>Overall rating:</InputLabel></Col>
            <Col md="6">
              <StarRating currentRating={rating}
                maxPossibleRating={5}
                clickHandler={ratingVal => this.handleRatingClick(ratingVal)} />
            </Col>
            <Col md="3">
              <SubmitBtn
                as={Button}
                disabled={isAddingProductReview}
                className={'action-btn' +
                  (isAddingProductReview ? ' btn-processing' :'')}
                title={strings.product.addReviewButton.title}>
                {strings.product.addReviewButton.text}
              </SubmitBtn>
            </Col>
          </Row>
          <Clearfix />
        </ReviewForm>
      </>
    );
  }
}

ProductReviewForm.propTypes = {
  productId: PropTypes.number,
  addProductReview: PropTypes.func,
  isAddingProductReview: PropTypes.bool,
  addProductReviewError: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  addProductReview: (productId, reviewData) => dispatch(
    addProductReview(productId, reviewData)),
});

const mapStateToProps = createStructuredSelector({
  isAddingProductReview: makeSelectIsAddingProductReview(),
  addProductReviewError: makeSelectAddProductReviewError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductReviewForm);
