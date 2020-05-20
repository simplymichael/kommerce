import React from 'react';
import PropTypes from 'prop-types';

export default function Logo ({ width = '64px', height = '45px' }) {
  return (
    <img src="logo.png" alt="Site logo" style={{ width, height }} />
  )
}

Logo.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
}
