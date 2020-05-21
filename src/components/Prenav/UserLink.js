import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const UserLink = ({ user }) => {
  user = user || (
    Math.floor(Math.random() * 2) > 0
      ? { id: 1, name: 'Dummy User' }
      : {}
  );

  if(user.id) {
    return `Welcome ${user.name}`
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
}

UserLink.propTypes = {
  user: PropTypes.object,
}

export default UserLink;
