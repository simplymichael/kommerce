import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Col, Row, Button } from 'react-bootstrap';
import colors from '../../resources/colors';
import strings from '../../resources/strings';
import { generateUniqueProductKey } from '../../utils/product';
import QuantityController from '../../components/QuantityController';
import Loading from '../../components/Notifications/Loading';
import { Error, Info } from '../../components/Notifications';
import ColorsFilter from '../../components/Filters/ColorsFilter';
import PricesFilter from '../../components/Filters/PricesFilter';
import SizesFilter from '../../components/Filters/SizesFilter';

import {
  fetchProductDetails,
  makeSelectProductDetails,
  makeSelectIsFetchingProductDetails,
  makeSelectFetchProductDetailsError,

  fetchRelatedProducts,
  makeSelectRelatedProducts,
  makeSelectIsFetchingRelatedProducts,
  makeSelectFetchRelatedProductsError,
} from '../../store/product';

import {
  addProductToCart,
  makeSelectAddProductToCartError,
  makeSelectProductsBeingAddedToCart,
} from '../../store/cart';

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

const FiltersContainer = styled.div`
  background: 'transparent';
  border: 'none';
  padding: '5px'
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
      quantityController: {
        currentValue: 1,
        incrementClickHandler: () => this._incrementQuantity(),
        decrementClickHandler: () => this._decrementQuantity()
      }
    };
  }

  componentDidMount() {
    const { productId, fetchProductDetails } = this.props;

    fetchProductDetails(productId);
  }

  render () {
    const { quantityController: {
      currentValue,
      incrementClickHandler,
      decrementClickHandler
    } } = this.state;

    const {
      addToCart,
      isFetchingProductDetails,
      fetchProductDetailsError
    } = this.props;

    const product = this.props.product;

    if(isFetchingProductDetails) {
      return (
        <div style={{
          width: '100px',
          margin: 'auto',
        }}>
          <Loading width="100px" height="100px" color="#aaa" opacity="0.5"
            role="product-loading-indicator" />
        </div>
      );
    }

    if(fetchProductDetailsError) {
      return <Error>
        {strings.product.fetchDetailsError}
      </Error>;
    }

    if(!product || !product.images) {
      return (
        <Info>{strings.product.notFound}</Info>
      );
    }

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
          <FiltersContainer role="filters-container">
            <ColorsFilter role="colors-filter-container" />
            <SizesFilter role="sizes-filter-container" />
            <div style={{ width: '300px' }}>
              <PricesFilter role="prices-filter-container" />
            </div>
          </FiltersContainer>
          <QuantityDiv>
            <QuantityHeader>Quantity</QuantityHeader>
            <QuantityController
              currentValue={currentValue}
              onIncrement={incrementClickHandler}
              onDecrement={decrementClickHandler}/>
          </QuantityDiv>
          {this._isAddingProductToCart() && (
            <AddToCartButton role="add-to-cart-button" disabled={true}>
              {strings.cart.addButtonString}
            </AddToCartButton>
          )}
          {!this._isAddingProductToCart() && (
            <AddToCartButton role="add-to-cart-button" onClick={() => {
              addToCart(product, {
                color: product.color,
                size: product.size,
                quantity: currentValue
              });
            }}>
              {strings.cart.addButtonString}
            </AddToCartButton>
          )}
        </Col>
        <Clearfix />
      </Row>
    );
  }

  _isAddingProductToCart() {
    const { product, addToCartList } = this.props;
    const productKey = generateUniqueProductKey(product);

    // eslint-disable-next-line
    return (addToCartList.filter(prod =>
      generateUniqueProductKey(prod) === productKey)).length > 0;
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
    defaultImage: PropTypes.shape({
      url: PropTypes.string
    })
  }),
  addToCart: PropTypes.func,
  addToCartError: PropTypes.string,
  addToCartList: PropTypes.array,
  fetchProductDetails: PropTypes.func,
  isFetchingProductDetails: PropTypes.bool,
  fetchProductDetailsError: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  fetchProductDetails: (productId) => dispatch(fetchProductDetails(productId)),
  fetchRelatedProducts: (productId) => dispatch(
    fetchRelatedProducts(productId)),
  addToCart: (product, { color, size, quantity }) =>
    dispatch(addProductToCart(product, { color, size, quantity })),
});

const mapStateToProps = createStructuredSelector({
  product: makeSelectProductDetails(),
  isFetchingProductDetails: makeSelectIsFetchingProductDetails(),
  fetchProductDetailsError: makeSelectFetchProductDetailsError(),

  addToCartError: makeSelectAddProductToCartError(),
  addToCartList: makeSelectProductsBeingAddedToCart(),

  relatedProducts: makeSelectRelatedProducts(),
  isFetchingRelatedProducts: makeSelectIsFetchingRelatedProducts(),
  fetchRelatedProductsError: makeSelectFetchRelatedProductsError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
