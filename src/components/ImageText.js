import React from 'react';
import PropTypes from 'prop-types';

export default function ImageText (props) {
  const {
    src, alt = '', width = '32px', height = '32px', children = <span />
  } = props;

  return (
    <React.Fragment>
    <img src={src} alt={alt} style={{ width, height }} />
    {children}
    </React.Fragment>
  )
}

ImageText.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.node,
}
