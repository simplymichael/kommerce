import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectUser,
  fetchCurrentUser,
  makeSelectIsFetchingCurrentUser,
  makeSelectFetchCurrentUserError,
  logout,
} from '../../store/users';

const UserLink = (props) => {
  const { user, logout, fetchCurrentUser } = props;

  useEffect(() => {
    fetchCurrentUser(); // eslint-disable-next-line
  }, []);

  if(user.id) {
    return (
      <>
        Welcome {user.name}
        &nbsp; | &nbsp;
        <Link to="#" onClick={(e) => {
          e.preventDefault();
          logout();
        }}>
        Sign out
        </Link>
      </>
    );
  }

  return (
    <>
      <Link className="text-muted" to="/signin">
        Sign in
      </Link>
      &nbsp; or &nbsp;
      <Link className="text-muted" to="/signup">
        Register
      </Link>
    </>
  );
};

UserLink.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
  }),
  logout: PropTypes.func,
  fetchCurrentUser: PropTypes.func,
  isFetchingCurrentUser: PropTypes.bool,
  fetchCurrentUserError: PropTypes.string,
};

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  fetchCurrentUser: () => dispatch(fetchCurrentUser()),
});

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  isFetchingCurrentUser: makeSelectIsFetchingCurrentUser(),
  fetchCurrentUserError: makeSelectFetchCurrentUserError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserLink);
