import React, { useState } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'react-bootstrap';
import device from '../../utils/device';
import colors from '../../resources/colors';
import strings from '../../resources/strings';
import { PlusIcon, MinusIcon } from '../../components/Icons';
import OrderReview from './OrderReview';
import PaymentForm from './PaymentForm';
import BillingAddressForm from './BillingAddressForm';
import PlaceOrderButton from './PlaceOrderButton';

const Small = styled.small`
  font-size: 12px;
  display: inline-block;
`;

const Clearfix = styled.div`
  clear: both;
`;

const Div = styled.div`
  padding: 0;
  margin: 0;
  margin-top: 15px;
`;

const MainHeader = styled.h5`
  font-size: 20px;
  margin-bottom: 15px;
  color: ${() => colors.headers.h5};
`;

const SmallHeader = styled(Small)`
  margin-left: 50px;
  cursor: pointer;
  font-style: italic;
  color: ${() => colors.page.text};
`;

const ToggleVisibilityHeader = styled(SmallHeader)`
  float: right;
  position: relative;

  @media (min-width: ${device.laptop}) {
    display: none;
  }

  @media (min-width: ${device.tablet}) {
    display: none;
  }
  @media (max-width: ${device.mobileL}) {
    bottom: 0px;
  }

  @media (max-width: ${device.mobileM}) {
    bottom: -10px;
  }

  @media (max-width: ${device.mobileS}) {
    bottom: 32px;
  }
`;

const ColumnHeader = styled.h5`
  display: inline-block;
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
  text-transform: uppercase;
  color: ${() => colors.headers.h5};
`;

const StepHeader = styled.h5`
  display: inline-block;
  margin-right: 5px;
  font-size: 28px;
  font-weight: 700;
  font-style: italic;
  color: #900;
`;

const PaymentMethod = styled.input.attrs(() => ({
  type: 'radio',
  name: 'payment-method'
}))``;

const PaymentMethodText = styled.span`
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
`;

const CheckoutColumn = styled.div`
  padding: 0;
  padding-right: 15px;
  border-right: 1px dashed #aaa;
`;

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [paymentMethodVisible, setPaymentMethodVisible] = useState(true);
  const [
    showingBillingAddressForm,
    setShowingBillingAddressForm
  ] = useState(true);

  return (
    <Row>
      <Col md="12" role="main-content">
        <Row>
          <Col md="12">
            <MainHeader>
              {strings.checkout.header}
              <SmallHeader>
                {strings.checkout.enterDetailsMessage}
              </SmallHeader>
            </MainHeader>
          </Col>
        </Row>
        <Row>
          <Col md="4" role="billing-address-section">
            <CheckoutColumn>
              <StepHeader>1</StepHeader>
              <ColumnHeader>
                {strings.checkout.billingAddressHeader}
              </ColumnHeader>
              <ToggleVisibilityHeader
                title={
                  (showingBillingAddressForm ? 'Hide': 'Show')
                  + ' billing address form'
                }
                onClick={() =>
                  setShowingBillingAddressForm(!showingBillingAddressForm)
                }>
                { showingBillingAddressForm ? <MinusIcon /> : <PlusIcon /> }
              </ToggleVisibilityHeader>
              <Clearfix />
              { showingBillingAddressForm && <BillingAddressForm /> }
            </CheckoutColumn>
          </Col>
          <Col md="4" role="payment-method-section">
            <CheckoutColumn>
              <StepHeader>2</StepHeader>
              <ColumnHeader>
                {strings.checkout.paymentMethodHeader}
              </ColumnHeader>
              <ToggleVisibilityHeader
                title={
                  (paymentMethodVisible ? 'Hide' : 'Show') + ' payment options'
                }
                onClick={() => setPaymentMethodVisible(!paymentMethodVisible)}
              >
                {paymentMethodVisible ? <MinusIcon /> : <PlusIcon />}
              </ToggleVisibilityHeader>
              <Clearfix />
              { paymentMethodVisible &&
              <>
                <Div>
                  <PaymentMethod
                    value="credit-card"
                    defaultChecked={true}
                    onChange={() => setPaymentMethod('credit-card')} />
                  <PaymentMethodText>Credit Card</PaymentMethodText>
                </Div>
                <Div>
                  <PaymentMethod
                    value="paypal"
                    onChange={() => setPaymentMethod('paypal')} />
                  <PaymentMethodText>Paypal</PaymentMethodText>
                </Div>
                {paymentMethod === 'credit-card' && <PaymentForm />}
              </>
              }
            </CheckoutColumn>
          </Col>
          <Col md="4" role="order-review-section">
            <StepHeader>3</StepHeader>
            <ColumnHeader>
              {strings.checkout.reviewOrder}
            </ColumnHeader>
            <Div>
              <OrderReview />
            </Div>
            <Clearfix />
            <PlaceOrderButton />
            <Clearfix />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Checkout;
