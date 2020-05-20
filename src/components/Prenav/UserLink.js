import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  const user = Math.floor(Math.random() * 2) > 0
    ? { id: 1, name: 'Michael' }
    : {};

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
