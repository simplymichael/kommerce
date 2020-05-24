import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col, Row, Button } from 'react-bootstrap';
import colors from '../../resources/colors';
import products from '../../__DATA__/products';
import QuantityController from '../../components/QuantityController';
import { PlusIcon, MinusIcon } from '../../components/Icons';
import ProductReviews from './ProductReviews';
import ProductReviewForm from './ProductReviewForm/ProductReviewForm';

const productColors = colors.product;

const Clearfix = styled.div`
  clear: both;
`;

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

const ProductTitle = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 18px;
  padding: 5px;
  color: ${() => productColors.text};;
`;

const Image = styled.img`
  border-radius: 3px;
  width: 100%;
  vertical-align: middle;
  border-style: none;
`;

const ImageSmall = styled(Image)`
  margin-top: 15px;
`;

const QuantityHeader = styled.h5`
  margin-top: -5px;
  margin-bottom: 10px;
`;

const QuantityDiv = styled.div`
  padding: 0 0 10px 5px;
  margin: 0 0 10px 0;
  border-bottom: 1px solid #f1f1f1;
`;

const AddToCartButton = styled(Button)`
  border-radius: 30px;
  color: ${() => productColors.actionButtonText};
  border-color: ${() => productColors.actionButtonBorder}
  background-color: ${() => productColors.actionButton};

  :hover {
    color: ${() => productColors.actionButtonHoverText};
    border-color: ${() => productColors.actionButtonHoverBorder}
    background-color: ${() => productColors.actionButtonHover}
  }
`;


// Product reviews components
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


class Product extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      reviewsVisible: true,
      reviewFormVisible: true,
      productLoaded: false,
      quantityController: {
        currentValue: 1,
        incrementClickHandler: () => this._incrementQuantity(),
        decrementClickHandler: () => this._decrementQuantity()
      }
    };
  }

  render () {
    const { reviewsVisible, reviewFormVisible, quantityController } = this.state;
    const { currentValue, incrementClickHandler, decrementClickHandler
    } = quantityController;
    const { onAddToCart } = this.props;
    const selectedColor = '';
    const selectedSize = '';

    //eslint-disable-next-line
    const productId = parseInt(this.props.match.params.id, 10);
    const product = this.props.product || products.find(
      product => product.id === productId);
    product.defaultImage = product.images.find(image => image.default === true);

    return (
      <Row>
        <Col md="12" role="main-content">
          <DetailsContainer role="product-details-container">
            <Row>
              <Col md="6">
                <Image src={product.defaultImage.url} role="product-image" />
                <Row>
                  {product.images.map((image, i) => (
                    <Col md="4" key={i}>
                      <ImageSmall src={image.url} />
                    </Col>
                  ))}
                </Row>
              </Col>
              <Col md="6">
                <ProductTitle role="product-name">
                  {product.name}
                </ProductTitle>

                <QuantityDiv>
                  <QuantityHeader>Quantity</QuantityHeader>
                  <QuantityController
                    currentValue={currentValue}
                    onIncrement={incrementClickHandler}
                    onDecrement={decrementClickHandler}/>
                </QuantityDiv>
                <AddToCartButton role="add-to-cart-button" onClick={() => {
                  onAddToCart(product, {
                    color: selectedColor,
                    size: selectedSize,
                    quantity: currentValue
                  });
                }}>Add to cart
                </AddToCartButton>
              </Col>
              <Clearfix />
            </Row>
          </DetailsContainer>
          <ReviewsContainer>
            <Row>
              <Col md="12">
                <Header>
                Product reviews
                  <SmallHeader title={(reviewsVisible ? 'Hide' : 'Show') + ' reviews'}
                    onClick={() => this._toggleVisibility('reviews')}>
                    { reviewsVisible ? <MinusIcon /> : <PlusIcon /> }
                  </SmallHeader>
                </Header>
                { reviewsVisible && <ProductReviews productId={this.productId} /> }
              </Col>
              <Col md="12">
                <Header>
                  Add a review
                  <SmallHeader
                    title={(reviewFormVisible ? 'Hide' : 'Show') + ' review form'}
                    onClick={() => this._toggleVisibility('reviewForm')}>
                    { reviewFormVisible ? <MinusIcon /> : <PlusIcon /> }
                  </SmallHeader>
                </Header>
                { reviewFormVisible && <ProductReviewForm productId={this.productId} /> }
              </Col>
            </Row>
          </ReviewsContainer>
        </Col>
      </Row>
    );
  }

  _incrementQuantity() {
    this.setState({
      quantityController: {
        ...this.state.quantityController,
        currentValue: this.state.quantityController.currentValue + 1
      }
    });
  }

  _decrementQuantity() {
    this.setState(currState => {
      let val = currState.quantityController.currentValue - 1;
      val = val < 1 ? 1 : val;

      return {
        quantityController: {
          ...this.state.quantityController,
          currentValue: val
        }
      };
    });
  }

  _toggleVisibility(view) {
    const viewProp = `${view}Visible`;
    this.setState({ [viewProp]: !this.state[viewProp] });
  }
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    brand: PropTypes.string,
    color: PropTypes.string,
    images: PropTypes.array,
    price: PropTypes.number,
    size: PropTypes.string,
  }),
  onAddToCart: PropTypes.func,
};

export default Product;
