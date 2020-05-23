import React from 'react';
import PropTypes from 'prop-types';
import ImageText from './ImageText';

export default function Logo (props) {
  const { width = '64px', height = '45px', children = '' } = props;
  return (
    <ImageText src="logo.png" alt="Site logo" width={width} height={height}>
      {children}
    </ImageText>
  );
}

Logo.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  children: PropTypes.node,
};
