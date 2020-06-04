import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import {
  Col, Row, Button,
  Form, FormGroup, FormControl
} from 'react-bootstrap';
import colors from '../../resources/colors';
import { Error } from '../../components/Notifications';
import {
  loginUser,
  makeSelectLoginError,
  makeSelectIsLoggingIn,
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

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        email: '',
        password: '',
      },
      validationError: '',
    };
  }

  render() {
    const { isLoggingIn, loginError } = this.props;

    const {
      user: { email,  password },
      validationError,
    } = this.state;

    const error = loginError || validationError;

    return (
      <Form onSubmit={evt => this.handleSubmit(evt)} role="login-form">
        <Row>
          <Col md="12">
            <FormGroup>
              <InputLabel>Email:</InputLabel>
              <Input
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                onChange={evt => this.handleInputChange(evt)} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <FormGroup>
              <InputLabel>Password:</InputLabel>
              <Input
                type="password"
                name="password"
                value={password}
                placeholder="Password"
                onChange={evt => this.handleInputChange(evt)} />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            {error &&
             <Error>{error}</Error>}
            <SubmitBtn as={Button}
              className={'action-btn' +
              (isLoggingIn ? ' btn-processing disabled' : '')}>
              Sign In
            </SubmitBtn>
          </Col>
        </Row>
        <Clearfix />
      </Form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    if(!this.validateLoginData()) {
      return;
    }

    // Prevent re-submission
    // while the current submission is still processing
    if(this.props.isLoggingIn) {
      return;
    }

    this.props.login(this.state.user);
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

  validateLoginData() {
    const requiredData = {
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

LoginForm.propTypes = {
  login: PropTypes.func,
  isLoggingIn: PropTypes.bool,
  loginError: PropTypes.string
};

const mapDispatchToProps = dispatch => ({
  login: (userData, authProvider) => dispatch(loginUser(userData, authProvider)),
});

const mapStateToProps = createStructuredSelector({
  isLoggingIn: makeSelectIsLoggingIn(),
  loginError: makeSelectLoginError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
