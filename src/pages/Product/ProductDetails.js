import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col, Row, Button } from 'react-bootstrap';
import colors from '../../resources/colors';
import strings from '../../resources/strings';
import products from '../../__DATA__/products';
import QuantityController from '../../components/QuantityController';

const productColors = colors.product;

const Clearfix = styled.div`
  clear: both;
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

class ProductDetails extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      productLoaded: false,
      quantityController: {
        currentValue: 1,
        incrementClickHandler: () => this._incrementQuantity(),
        decrementClickHandler: () => this._decrementQuantity()
      }
    };
  }

  render () {
    const { quantityController: {
      currentValue,
      incrementClickHandler,
      decrementClickHandler
    } } = this.state;

    const { addToCart, productId } = this.props;
    const selectedColor = '';
    const selectedSize = '';

    const product = this.props.product || products.find(
      product => product.id === productId);
    product.defaultImage = product.images.find(image => image.default === true);

    return (
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
            addToCart(product, {
              color: selectedColor,
              size: selectedSize,
              quantity: currentValue
            });
          }}>
            {strings.cart.addButtonString}
          </AddToCartButton>
        </Col>
        <Clearfix />
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
}

ProductDetails.propTypes = {
  productId: PropTypes.number,
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    brand: PropTypes.string,
    color: PropTypes.string,
    images: PropTypes.array,
    price: PropTypes.number,
    size: PropTypes.string,
  }),
  addToCart: PropTypes.func,
};

export default ProductDetails;
