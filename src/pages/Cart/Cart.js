import React  from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';
import Loading from '../../components/Notifications/Loading';
import { Error } from '../../components/Notifications';
import QuantityController from '../../components/QuantityController';
import {
  fetchCartItems,
  makeSelectCartItems,
  makeSelectIsFetchingCartItems,
  makeSelectFetchCartItemsError,

  increaseProductQuantityInCart,
  decreaseProductQuantityInCart,

  removeProductFromCart,
  makeSelectProductsBeingRemovedFromCart,
  makeSelectRemoveProductFromCartError,
} from '../../store/cart';
import colors from '../../resources/colors';
import strings from '../../resources/strings';
import device from '../../utils/device';

const HeaderSection = styled.div`
  border-bottom: 1px solid ${() => colors.page.separatorColor};
  margin-bottom: 10px;
  padding-left: 0;
  padding-right: 0;

  @media (max-width: ${device.tablet}) {
    display: none;
  }
`;

const ItemContainer = styled(Row)`
  margin-bottom: 10px;
`;

const ItemImage = styled.img`
  width: 100%;
`;

const InfoContainer = styled(Container)`
  color: ${() => colors.page.text};
  padding: ${props => props.padding || '0'};
`;

const SmallText = styled.small`
  font-size: 12px;
  display: inline-block;
  cursor: pointer;
`;

const PullRight = styled.span`
  @media (min-width: ${device.tablet}) {
    display: inline-block;
    float: right;
  }
`;

const Header = styled.h5`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  color: rgb(20, 23, 36);
`;

class Cart extends React.Component {
  componentDidMount() {
    this.props.fetchCartItems();
  }

  decrementProductQuantity(product, decrementAmount) {
    const { quantity } = product;

    if(quantity === 1) {
      // We can't reduce it further, so
      return;
      // or show a message that if you don't need the item,
      // you can use the remove button to remove it instead
    }

    this.props.decrementClickHandler(product, decrementAmount);
  }

  render() {
    const {
      cartItems,
      isFetchingCartItems,
      fetchCartItemsError,
      removeProductFromCart,
      incrementClickHandler,
    } = this.props;

    if(isFetchingCartItems) {
      return (
        <div style={{
          width: '100px',
          margin: 'auto'
        }}>
          <Loading width="100px" height="100px" opacity="0.5" color="#ccc"
            role="cart-items-loading-indicator" />
        </div>
      );
    }

    if(fetchCartItemsError) {
      return (
        <Error>
          Error fetching cart items.
          Please, refresh the page to try again.
        </Error>
      );
    }

    if(cartItems.length === 0) {
      return (
        <div>
          <p>Your cart is currently empty</p>
          <p>
            <Link to="/">Browser our shop</Link>
            &nbsp;
            to add items to your cart
          </p>
        </div>
      );
    }

    const items = cartItems.slice();
    const cartLength = cartItems.length;

    items.forEach(product => {
      product.defaultImage = product.images.find(img => img.default === true);
    });

    const itemsList = items.map((item, i) => (
      <ItemContainer key={i}>
        <Col md="2"><ItemImage src={item.defaultImage.url} /></Col>
        <Col md="4">
          <InfoContainer>
            {item.name} <br />
            <SmallText
              title={strings.cart.removeFromCart.title}
              onClick={() => removeProductFromCart(item)}>
              x {strings.cart.removeFromCart.text}
            </SmallText>
          </InfoContainer>
        </Col>
        <Col md="1">
          <InfoContainer padding="10px">
            {item.size}
          </InfoContainer>
        </Col>
        <Col md="3">
          <InfoContainer>
            <QuantityController currentValue={item.quantity}
              onIncrement={() => { incrementClickHandler(item, 1); }}
              onDecrement={() => { this.decrementProductQuantity(item, 1); }} />
          </InfoContainer>
        </Col>
        <Col md="2">
          <PullRight><InfoContainer>${item.price}</InfoContainer></PullRight>
        </Col>
      </ItemContainer>
    ));

    return (
      <>
        <Header>Distinct items in your Cart: {cartLength}</Header>
        <HeaderSection>
          <Row>
            <Col md="2">
              <Header>
                {strings.cart.itemSummary.itemHeader}
              </Header>
            </Col>
            <Col md="4">{/* Item description */}</Col>
            <Col md="1">
              <Header>
                {strings.cart.itemSummary.sizeHeader}
              </Header>
            </Col>
            <Col md="3">
              <Header>
                {strings.cart.itemSummary.quantityHeader}
              </Header>
            </Col>
            <Col md="2">
              <PullRight>
                <Header>
                  {strings.cart.itemSummary.priceHeader}
                </Header>
              </PullRight>
            </Col>
          </Row>
        </HeaderSection>
        {itemsList}
      </>
    );
  }
}

Cart.propTypes = {
  cartItems: PropTypes.array,
  isFetchingCartItems: PropTypes.bool,
  fetchCartItemsError: PropTypes.string,
  fetchCartItems: PropTypes.func,
  removeProductFromCart: PropTypes.func,
  incrementClickHandler: PropTypes.func,
  decrementClickHandler: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  fetchCartItems: () => dispatch(fetchCartItems()),
  removeProductFromCart: (product) => dispatch(removeProductFromCart(product)),
  incrementClickHandler: (product, incrementAmount) =>
    dispatch(increaseProductQuantityInCart(product, incrementAmount)),
  decrementClickHandler: (product, decrementAmount) =>
    dispatch(decreaseProductQuantityInCart(product, decrementAmount)),
});

const mapStateToProps = createStructuredSelector({
  cartItems: makeSelectCartItems(),
  isFetchingCartItems: makeSelectIsFetchingCartItems(),
  fetchCartItemsError: makeSelectFetchCartItemsError(),
  removeFromCartList: makeSelectProductsBeingRemovedFromCart(),
  removeProductFromCartError: makeSelectRemoveProductFromCartError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
