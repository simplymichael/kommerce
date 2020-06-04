import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import device from '../../utils/device';
import colors from '../../resources/colors';
import QuantityController from '../../components/QuantityController';
import {
  fetchCartItems,
  makeSelectIsFetchingCartItems,
  makeSelectFetchCartItemsError,
  makeSelectCartItems,

  increaseProductQuantityInCart,
  decreaseProductQuantityInCart,

  removeProductFromCart,
  makeSelectRemoveProductFromCartError,

  fetchCartPrice,
  makeSelectIsFetchingCartPrice,
  makeSelectFetchCartPriceError,
  makeSelectCartPriceData,
} from '../../store/cart';

const Small = styled.small`
  font-size: 12px;
  display: inline-block;
`;

// Dummy Div created  so that the :last-child selector can work
const Div = styled.div`
  padding: 0;
  margin: 0;
`;

const Rows = styled(Row)`
  padding-top: 5px;
  padding-bottom: 10px;
  margin-right: 0;

  @media (max-width: ${device.tablet}) {
    margin-left: 0px;
  }
`;

const ItemRow = styled(Rows)`
  margin-bottom: 10px;
  border-bottom: 2px solid ${() => colors.page.separatorColor};

  :last-child {
    border-bottom: none !important;
  }
`;

const ItemCol = styled(Col)`
  padding-left: 0;

  @media (min-width: ${device.tablet}) {
    :last-child {
      padding-right: 0 !important;
    }
  }
`;

const ItemImage = styled.img`
  width: 100%;
`;

const SmallText = styled(Small)`
  background-color: #ddd;
  padding: 1px 5px;
  padding-bottom: 3px;
  vertical-align: middle;
  border-radius: 40%;
  cursor: pointer;
  color: #fff;
  font-weight: 700;
`;

const SubTotalRow = styled(Rows)`
  border-top: 2px solid #000;
  border-bottom: 1px solid #ddd;
  font-weight: 700;
  padding-right: 0px !important;
`;

const GrandTotalRow = styled(Rows)`
  border-bottom: 3px solid #000;
  text-transform: uppercase;
  font-weight: 700;
`;

const ComputationCol = styled(Col)`
  @media (min-width: ${device.tablet}) {
    :last-child {
      padding-right: 0 !important;
    }
  }
`;

const Pull = styled.span`
  display: 'inline-block';

  ${props => props.right && css`
    float: right
  `}

  ${props => props.left && css`
    float: left
  `}
`;

class OrderReview extends React.Component {
  componentDidMount() {
    this.props.fetchCartItems();

    // this.props.fetchCartItems() invokes the fetchCartData() on success
    // (see the state/cart/sagas.js file for more).
    // So, re-invoking it here is redundant.
    //this.props.fetchCartPrice();
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
      cartPrice: {
        subTotal: orderSubTotal,
        grandTotal: orderGrandTotal,
      },
      removeProductFromCart,
      incrementClickHandler,
      isFetchingCartPrice,
    } = this.props;

    const items = cartItems.slice();

    items.forEach(product => {
      product.defaultImage = product.images.find(img => img.default === true);
    });

    const itemsList = items.map((item, i) => (
      <ItemRow key={i}>
        <ItemCol md="3">
          <ItemImage src={item.defaultImage.url} />
        </ItemCol>
        <ItemCol md="5">
          {item.name}&nbsp;
          <Small>{item.color === 'any' ? '' : `(${item.color}) `}</Small>
          <Small>{item.size === 'any' ? '' : `(${item.size})`}</Small>
          <br />
          <QuantityController
            currentValue={item.quantity}
            onIncrement={() => { incrementClickHandler(item, 1); }}
            onDecrement={() => { this.decrementProductQuantity(item, 1); }}
          />
        </ItemCol>
        <ItemCol md="4">
          <Pull right>
            ${item.price}&nbsp;
            <SmallText
              title="Remove item"
              onClick={() => removeProductFromCart(item)}>
              x
            </SmallText>
          </Pull>
        </ItemCol>
      </ItemRow>
    ));

    return (
      <>
        <Div>{itemsList}</Div>
        <SubTotalRow>
          <ComputationCol md="4">&nbsp;</ComputationCol>
          <ComputationCol md="4">
            <Pull right>Subtotal</Pull>
          </ComputationCol>
          <ComputationCol md="4">
            <Pull right>
              { isFetchingCartPrice && 'Calculating...' }
              { !isFetchingCartPrice && `${orderSubTotal}` }
            </Pull>
          </ComputationCol>
        </SubTotalRow>
        <GrandTotalRow>
          <ComputationCol md="3">&nbsp;</ComputationCol>
          <ComputationCol md="5">
            <Pull right>Grand Total</Pull>
          </ComputationCol>
          <ComputationCol md="4">
            <Pull right>
              { isFetchingCartPrice && 'Calculating...' }
              { !isFetchingCartPrice && `${orderGrandTotal}` }
            </Pull>
          </ComputationCol>
        </GrandTotalRow>
      </>
    );
  }
}

OrderReview.propTypes = {
  cartItems: PropTypes.array,
  cartPrice: PropTypes.shape({
    subTotal: PropTypes.string,
    grandTotal: PropTypes.string,
  }),
  fetchCartItems: PropTypes.func,
  fetchCartPrice: PropTypes.func,
  removeProductFromCart: PropTypes.func,

  isFetchingCartItems: PropTypes.bool,
  isFetchingCartPrice: PropTypes.bool,
  fetchCartItemsError: PropTypes.string,
  fetchCartPriceError: PropTypes.string,
  removeProductFromCartError: PropTypes.string,

  incrementClickHandler: PropTypes.func,
  decrementClickHandler: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  fetchCartItems: () => dispatch(fetchCartItems()),
  fetchCartPrice: () => dispatch(fetchCartPrice()),
  removeProductFromCart: (product) => dispatch(removeProductFromCart(product)),
  incrementClickHandler: (product, incrementAmount) =>
    dispatch(increaseProductQuantityInCart(product, incrementAmount)),
  decrementClickHandler: (product, decrementAmount) =>
    dispatch(decreaseProductQuantityInCart(product, decrementAmount)),
});

const mapStateToProps = createStructuredSelector({
  cartItems: makeSelectCartItems(),
  cartPrice: makeSelectCartPriceData(),
  isFetchingCartItems: makeSelectIsFetchingCartItems(),
  isFetchingCartPrice: makeSelectIsFetchingCartPrice(),
  fetchCartItemsError: makeSelectFetchCartItemsError(),
  fetchCartPriceError: makeSelectFetchCartPriceError(),
  removeProductFromCartError: makeSelectRemoveProductFromCartError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderReview);
