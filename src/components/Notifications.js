import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../resources/colors';

const P = styled.p`
  font-size: 14px;
  font-weight: 700;
  text-align: center;
  color: ${props => colors.notifications[props.type]};
`;

const Notification = ({ type, message }) => <P type={type}>{message}</P>;

export const Error = ({ message }) => (
  <Notification type='error' message={message} />
);

export const Info = ({ message }) => (
  <Notification type='info' message={message} />
);

export const Success = ({ message }) => (
  <Notification type='success' message={message} />
);

export const Warning = ({ message }) => (
  <Notification type='warning' message={message} />
);

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
};

Info.propTypes = {
  message: PropTypes.string.isRequired,
};

Success.propTypes = {
  message: PropTypes.string.isRequired,
};

Warning.propTypes = {
  message: PropTypes.string.isRequired,
};
