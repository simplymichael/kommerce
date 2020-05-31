import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import RegistrationForm from './RegistrationForm';
import { makeSelectUser } from '../../store/users';

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
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
  }),
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export default connect(mapStateToProps)(SignUpPage);
