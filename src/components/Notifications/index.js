import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../../resources/colors';

const P = styled.p`
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  color: ${props => colors.notifications[props.type]};
`;

const Notification = ({ type, children }) => (
  <P type={type}>
    {children}
  </P>
);

export const Error = ({ children }) => (
  <Notification type='error'>
    {children}
  </Notification>
);

export const Info = ({ children }) => (
  <Notification type='info'>
    {children}
  </Notification>
);

export const Success = ({ children }) => (
  <Notification type='success'>
    {children}
  </Notification>
);

export const Warning = ({ children }) => (
  <Notification type='warning'>
    {children}
  </Notification>
);

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Error.propTypes = {
  children: PropTypes.node.isRequired,
};

Info.propTypes = {
  children: PropTypes.node.isRequired,
};

Success.propTypes = {
  children: PropTypes.node.isRequired,
};

Warning.propTypes = {
  children: PropTypes.node.isRequired,
};
