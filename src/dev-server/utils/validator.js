import * as EmailValidator from 'email-validator';
import env from '../.env';

export const isValidEmail = (email) => {
  return EmailValidator.validate(String(email).toLowerCase());
};

export const isValidPassword = (password) => {
  return password.length >= env.auth.minPasswordLength;
};
