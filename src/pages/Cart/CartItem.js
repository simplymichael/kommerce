import React  from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Col, Row, Container } from 'react-bootstrap';
import QuantityController from '../../components/QuantityController';
import colors from '../../resources/colors';
import device from '../../utils/device';
import strings from '../../resources/strings';

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

const CartItem = (props) => {
  const cartStrings = strings.pages.cart();
  const {
    item,
    incrementClickHandler,
    decrementClickHandler,
    removeFromCartHandler,
  } = props;

  return (
    <ItemContainer>
      <Col md="2"><ItemImage src={item.defaultImage.url} /></Col>
      <Col md="4">
        <InfoContainer>
          {item.name} <br />
          <SmallText
            title={cartStrings.removeFromCart.title}
            onClick={() => removeFromCartHandler(item)}>
            x {cartStrings.removeFromCart.text}
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
            onDecrement={() => { decrementClickHandler(item, 1); }} />
        </InfoContainer>
      </Col>
      <Col md="2">
        <PullRight><InfoContainer>${item.price}</InfoContainer></PullRight>
      </Col>
    </ItemContainer>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
    defaultImage: PropTypes.shape({
      url: PropTypes.string,
    }),
  }),
  incrementClickHandler: PropTypes.func,
  decrementClickHandler: PropTypes.func,
  removeFromCartHandler: PropTypes.func,
};

export default CartItem;
