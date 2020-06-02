import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import LoginForm from './LoginForm';
import { makeSelectUser } from '../../store/users';

class LoginPage extends React.Component {
  componentDidMount() {
    // If user is logged in, redirect
    if(this.props.user.id) {
      this.redirect();
    }
  }

  componentDidUpdate() {
    if(this.props.user.id) {
      this.redirect();
    }
  }

  redirect() {
    const { redirect: pageTo } = queryString.parse(this.props.location.search);
    this.props.history.push(pageTo || '/');
  }

  render() {
    return (
      <Row>
        <Col md="12">
          <LoginForm />
        </Col>
      </Row>
    );
  }
}

LoginPage.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  history: PropTypes.object,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
});

export default connect(mapStateToProps)(withRouter(LoginPage));
