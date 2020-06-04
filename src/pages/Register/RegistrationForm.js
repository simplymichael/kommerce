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
  margin-bottom: 40px;
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
  display: none;
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
      validationError: '',
    };
  }

  render() {
    const { isCreatingUser, createUserError } = this.props;
    const {
      user: { name,  email,  password },
      validationError,
    } = this.state;

    const error = createUserError || validationError;

    return (
      <Form onSubmit={evt => this.handleSubmit(evt)} role="registration-form">
        <Row>
          <Col md="12">
            <FormGroup>
              <InputLabel>Full Name:</InputLabel>
              <Input type="text" name="name" value={name}
                placeholder="Name"
                onChange={evt => this.handleInputChange(evt)} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <FormGroup>
              <InputLabel>Email:</InputLabel>
              <Input type="email" name="email" value={email}
                placeholder="Email"
                onChange={evt => this.handleInputChange(evt)} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <FormGroup>
              <InputLabel>Password:</InputLabel>
              <Input type="password" name="password" value={password}
                placeholder="Password"
                onChange={evt => this.handleInputChange(evt)} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            { error && <Error>{error}</Error>}
            <SubmitBtn as={Button}
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
