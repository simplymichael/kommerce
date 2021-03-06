import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import colors from '../../resources/colors';
import { Error } from '../../components/Notifications';

const Clearfix = styled.div`
  clear: both;
`;

const Form = styled.form`
  width: 100%;
  padding: 0;
`;

const Label = styled.label`
  display: inline-block;
  vertical-align: top;
`;

const Input = styled.input``;

const TextInput = styled(Input).attrs(props => ({
  type: props.type || 'text',
  className: 'form-control'
}))`
  width: 100%;
  margin-bottom: 5px;
`;

const Dropdown = styled.select.attrs(() => ({
  className: 'form-control'
}))``;

const Required = styled.span.attrs(() => ({
  children: '*'
}))`
  display: inline-block;
  color: ${() => colors.notifications.error};
`;

class PaymentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      card: {
        type        : '',
        number      : '',
        expiryYear  : '',
        expiryMonth : '',
        cvv         : ''
      },
    };
  }

  render() {
    const {
      error,
      card: { type, number, expiryYear, expiryMonth, cvv },
    } = this.state;
    
    const cardTypes = [
      'Select',
      'MasterCard', 'Verve', 'Visa'
    ].map((card) => (
      <option key={card} value={card === 'Select' ? '' : card}>
        {card}
      </option>
    ));

    const years = [
      'Select',
      2020, 2021, 2022, 2023, 2024
    ].map((year) => (
      <option key={year} value={year === 'Select' ? '' : year}>
        {year}
      </option>
    ));

    const months = [
      'Select',
      'Jan', 'Feb', 'March', 'April', 'May', 'June',
      'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ].map((month, i) => (
      <option key={i} value={month ==='Select' ? '' : month.toLowerCase()}>
        {month}
      </option>
    ));

    return (
      <>
        <Error>{error}</Error>
        <Form>
          <Row>
            <Col md="12" className="form-group">
              <Label>Card Type</Label><Required />
              <Dropdown name="type" value={type}
                onChange={evt => this.handleInputChange(evt)}>
                {cardTypes}
              </Dropdown>
            </Col>
            <Col md="12" className="form-group">
              <Label>Card Number</Label><Required />
              <TextInput name="number" value={number}
                onChange={evt => this.handleInputChange(evt)} />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <Label>Expiry Date</Label>
            </Col>
            <Col md="5">
              <Label>Year</Label><Required />
              <Dropdown name="expiryYear" value={expiryYear}
                onChange={evt => this.handleInputChange(evt)}>
                {years}
              </Dropdown>
            </Col>
            <Col md="4">
              <Label>Month</Label><Required />
              <Dropdown name="expiryMonth" value={expiryMonth}
                onChange={evt => this.handleInputChange(evt)}>
                {months}
              </Dropdown>
            </Col>
            <Col md="3">
              <Label>CVV</Label><Required />
              <TextInput name="cvv" value={cvv}
                onChange={evt => this.handleInputChange(evt)} />
            </Col>
          </Row>
          <Clearfix />
        </Form>
      </>
    );
  }

  handleInputChange(e) {
    e.preventDefault();

    const field = e.target.name;
    const value = e.target.value;

    this.setState(currState => ({
      card: {
        ...currState.card,
        [field]: value
      }
    }), () => this.validateCardData());
  }

  validateCardData() {
    this.setState({
      error: this.props.dataValidator(this.state.card),
    });
  }
}

PaymentForm.propTypes = {
  dataValidator: PropTypes.func,
};

export default PaymentForm;
