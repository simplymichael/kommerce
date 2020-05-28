import React from 'react';
import PropTypes from 'prop-types';

const Loading = (props) => {
  let {
    width = '64',
    height = '64',
    color='#000000',
    opacity = '1',
    role = 'loading-indicator',
  } = props;

  width = width.indexOf('px') <= 0 ? width + 'px' : width;
  height = height.indexOf('px') <= 0 ? `${height}px` : height;

  return (
    <svg role={role}
      xmlns="http://www.w3.org/2000/svg"
      version="1.0" width={width} height={height}
      viewBox="0 0 128 128">
      <rect x="0" y="0" width="100%" height="100%" fill="#FFFFFF" />
      <g>
        <path
          d="M64 9.75A54.25 54.25 0 0 0 9.75 64H0a64 64 0 0 1 128 0h-9.75A54.25 54.25 0 0 0 64 9.75z"
          fill={color}
          fillOpacity={opacity}/>
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 64 64"
          to="360 64 64"
          dur="1800ms"
          repeatCount="indefinite">
        </animateTransform>
      </g>
    </svg>
  );
};

Loading.propTypes = {
  role: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  opacity: PropTypes.string,
};

export default Loading;
