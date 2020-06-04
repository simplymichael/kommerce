import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { Col, Row, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import colors from '../../resources/colors';
import { Error } from '../../components/Notifications';
import {
  createUser,
  makeSelectIsCreatingUser,
  makeSelectCreateUserError,
} from '../../store/users';

const Clearfix = styled.div`
  margin: 0;
  padding: 0;
  clear: both;
`;

const Input = styled(FormControl)`
  margin-bottom: 25px;
  margin-left: 0;
  padding-left: 0;
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;

  :focus {
    border-top-color: transparent !important;
    border-left-color: transparent;
    border-right-color: transparent;
    box-shadow: none !important;
  }
`;

const InputLabel = styled.label`
  display: inline-block;
  visibility: hidden;
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

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        name: '',
        email: '',
        password: '',
      },
      placeholders: {
        name: 'Name',
        email: 'Email',
        password: 'Password',
      },
      validationError: '',
    };
  }

  render() {
    const { isCreatingUser, createUserError } = this.props;
    const {
      user: { name,  email,  password },
      validationError,
      placeholders: {
        name: namePlaceholder,
        email: emailPlaceholder,
        password: passwordPlaceholder
      },
    } = this.state;

    const error = createUserError || validationError;

    return (
      <Form onSubmit={evt => this.handleSubmit(evt)} role="registration-form">
        <Row>
          <Col md="12">
            <FormGroup>
              <InputLabel>Full Name:</InputLabel>
              <Input type="text" name="name" value={name}
                placeholder={namePlaceholder}
                onFocus={(e) => this.handleInputFocus(e)}
                onBlur={(e) => this.handleInputBlur(e)}
                onChange={evt => this.handleInputChange(evt)} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <FormGroup>
              <InputLabel>Email:</InputLabel>
              <Input type="email" name="email" value={email}
                placeholder={emailPlaceholder}
                onFocus={(e) => this.handleInputFocus(e)}
                onBlur={(e) => this.handleInputBlur(e)}
                onChange={evt => this.handleInputChange(evt)} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <FormGroup>
              <InputLabel>Password:</InputLabel>
              <Input type="password" name="password" value={password}
                placeholder={passwordPlaceholder}
                onFocus={(e) => this.handleInputFocus(e)}
                onBlur={(e) => this.handleInputBlur(e)}
                onChange={evt => this.handleInputChange(evt)} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            { error && <Error>{error}</Error>}
            <SubmitBtn as={Button}
              style={{ borderRadius: '5px', width: '100%', marginTop: '25px' }}
              className={'action-btn' +
              (isCreatingUser ? 'btn-processing disabled' : '')}>
              Sign Up
            </SubmitBtn>
          </Col>
        </Row>
        <Clearfix />
      </Form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    if(!this.validateUserData()) {
      return;
    }

    // Prevent re-submission
    // while the current submission is still processing
    if(this.props.isCreatingUser) {
      return;
    }

    this.props.createUser(this.state.user);
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
    }));
  }

  handleInputFocus(e) {
    e.preventDefault();

    const field = e.target.name;

    this.setState(currState => ({
      placeholders: {
        ...currState.placeholders,
        [field]: ''
      }
    }));
  }

  handleInputBlur(e) {
    e.preventDefault();

    let value = '';
    const field = e.target.name;

    switch(field) {
    case 'name': value = 'Name'; break;
    case 'email': value = 'Email'; break;
    case 'password': value = 'Password'; break;
    default: value = '';
    }

    this.setState(currState => ({
      placeholders: {
        ...currState.placeholders,
        [field]: value,
      }
    }));
  }

  validateUserData() {
    const requiredData = {
      name: 'Name',
      email: 'Email',
      password: 'Password',
    };

    for(let [key, value] of Object.entries(requiredData)) {
      if(!this.state.user[key]) {
        this.setState({
          validationError: `The ${value} field is required`,
        });

        return false;
      }
    }

    return true;
  }
}

RegistrationForm.propTypes = {
  createUser: PropTypes.func,
  isCreatingUser: PropTypes.bool,
  createUserError: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  createUser: (userData) => dispatch(createUser(userData)),
});

const mapStateToProps = createStructuredSelector({
  isCreatingUser: makeSelectIsCreatingUser(),
  createUserError: makeSelectCreateUserError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);
