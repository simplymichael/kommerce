import React  from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Col, Row } from 'react-bootstrap';
import device from '../../utils/device';
import colors from '../../resources/colors';
import { Error } from '../../components/Notifications';

const Small = styled.small`
  font-size: 12px;
  display: inline-block;
`;

const Clearfix = styled.div`
  clear: both;
`;

const BillingForm = styled.form`
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

  @media (min-width: ${device.laptop}) {

  }
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

class BillingAddressForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      user: {
        firstname : '',
        lastname  : '',
        email     : '',
        phone     : '',
        address1  : '',
        address2  : '',
        city      : '',
        state     : '',
        country   : '',
        postcode  : '',
      },
      countries: [],
      states: [],
    };
  }

  componentDidMount() {
    this.initCountries();
  }

  render() {
    const { countries, states, user, error } = this.state;
    const {
      firstname,
      lastname,
      email,
      phone,
      address1,
      address2,
      city,
      state,
      country,
      postcode,
    } = user;

    const countriesList = countries.map(country => (
      <option key={country.code} value={country.code}>
        {country.name}
      </option>
    ));

    const statesList = states.map(state => (
      <option key={state.code} value={state.code}>
        {state.name}
      </option>
    ));

    countriesList.unshift(
      <option key={0} value=''>
        Select country
      </option>
    );

    statesList.unshift(
      <option key={-1} value=''>
        Select state
      </option>
    );

    return (
      <>
        <Error>{error}</Error>
        <BillingForm>
          <Row>
            <Col md="12" className="form-group">
              <Label>First Name</Label><Required />
              <TextInput name="firstname" value={firstname}
                onChange={evt => this.handleInputChange(evt)} />
            </Col>
            <Col md="12" className="form-group">
              <Label>Last Name</Label><Required />
              <TextInput name="lastname" value={lastname}
                onChange={evt => this.handleInputChange(evt)} />
            </Col>
          </Row>
          <Row>
            <Col md="12" className="form-group">
              <Label>Email Address</Label><Required />
              <TextInput type="email" name="email" value={email}
                onChange={evt => this.handleInputChange(evt)} />
            </Col>
            <Col md="12" className="form-group">
              <Label>Telephone</Label><Required />&nbsp;
              <Small>Format: (+000) 123-456-7890</Small>
              <TextInput type="tel" name="phone" value={phone}
                onChange={evt => this.handleInputChange(evt)} />
            </Col>
          </Row>
          <Row>
            <Col md="12" className="form-group">
              <Label>Address (Line 1)</Label><Required />
              <TextInput name="address1" value={address1}
                onChange={evt => this.handleInputChange(evt)} />
            </Col>
            <Col md="12" className="form-group">
              <Label>Address (Line 2)</Label>
              <TextInput name="address2" value={address2}
                onChange={evt => this.handleInputChange(evt)} />
            </Col>
          </Row>
          <Row>
            <Col md="6" className="form-group">
              <Label>Country</Label><Required />
              <Dropdown name="country" value={country}
                onChange={ evt => {
                  this.handleInputChange(evt);
                  this.initStates(evt);
                }}>
                {countriesList}
              </Dropdown>
            </Col>
            <Col md="6" className="form-group">
              <Label>State/Territory</Label><Required />
              <Dropdown name="state" value={state}
                onChange={evt => this.handleInputChange(evt)}>
                {statesList}
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <Col md="6" className="form-group">
              <Label>City/Suburb/Town</Label><Required />
              <TextInput name="city" value={city}
                onChange={evt => this.handleInputChange(evt)} />
            </Col>
            <Col md="6" className="form-group">
              <Label>Postcode</Label><Required />
              <TextInput name="postcode" value={postcode}
                onChange={evt => this.handleInputChange(evt)} />
            </Col>
          </Row>
          <Clearfix />
        </BillingForm>
      </>
    );
  }

  handleInputChange(e) {
    e.preventDefault();

    const field = e.target.name;
    const value = e.target.value;

    this.setState(currState => ({
      user: {
        ...currState.user,
        [field]: value
      }
    }), () => this.validateUserData());
  }

  initCountries() {
    const countries = [
      { code: 'NG', name: 'Nigeria' },
      { code: 'US', name: 'United States of America' },
      { code: 'UK', name: 'United Kingdom' },
    ];

    this.setState({
      countries,
    });
  }

  initStates(evt) {
    const country = evt.target.value;
    const states = !country ? [] : [
      {code: 'LAG', name: 'Lagos' },
      { code: 'ENU', name: 'Enugu' },
    ];

    this.setState({
      states,
    });
  }

  validateUserData() {
    this.setState({
      error: this.props.dataValidator(this.state.user),
    });
  }
}

BillingAddressForm.propTypes = {
  dataValidator: PropTypes.func,
};

export default BillingAddressForm;
