import * as CardValidator from 'card-validator';
import * as EmailValidator from 'email-validator';
import env from '../.env';

export const isValidEmail = (email) => {
  return EmailValidator.validate(String(email).toLowerCase());
};

export const isValidPhone = (phone) => {
  // regex credits: https://stackoverflow.com/a/46925593/1743192
  // eslint-disable-next-line
  return /^[+]?(1\-|1\s|1|\d{3}\-|\d{3}\s|)?((\(\d{3}\))|\d{3})(\-|\s)?(\d{3})(\-|\s)?(\d{4})$/g.test(phone);
};

export const isValidPassword = (password) => {
  return password.length >= env.auth.minPasswordLength;
};

export const isValidCreditCard = (cardNumber) => {
  return CardValidator.number(cardNumber).isValid;
};
