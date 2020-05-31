import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import RegistrationForm from './RegistrationForm';
import { makeSelectAuthSuccessData } from '../../store/users';

class SignUpPage extends React.Component {
  componentDidMount() {
    // If user is logged in, redirect
    /*if(this.props.authSuccessData.user.id) {
      // redirect
      return;
    }*/
  }

  render() {
    return (
      <Row>
        <Col md="12">
          <RegistrationForm />
        </Col>
      </Row>
    );
  }
}

SignUpPage.propTypes = {
  authSuccessData: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      email: PropTypes.string,
    }),
    accessToken: PropTypes.string,
    expiresIn: PropTypes.number,
  }),
};

const mapStateToProps = createStructuredSelector({
  authSuccessData: makeSelectAuthSuccessData(),
});

export default connect(mapStateToProps)(SignUpPage);
