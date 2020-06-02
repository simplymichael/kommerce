import shajs from 'sha.js';
import jwt from 'jsonwebtoken';
import randomBytes from 'random-bytes';
import env from '../.env';

export const generateAuthToken = (userId, email) => {
  const authToken   = randomBytes(32).toString('hex');
  const tokenSecret = env.auth.tokenKey;
  const tokenExpiry = env.auth.tokenExpiry + 's';
  const tokenData   = { userId, email, authToken };
  const signedToken = jwt.sign(tokenData, tokenSecret, {expiresIn: tokenExpiry});

  return { token: signedToken, expiry: tokenExpiry };
};

export const verifyAuthToken = async (token) => {
  const tokenSecret = env.auth.tokenKey;
  const decoded = await jwt.verify(token, tokenSecret);

  return decoded;
};

export const hashPassword = (password) => {
  return shajs('sha256').update(password).digest('hex');
};

export const checkPassword = (password, hashedPassword) => {
  return hashPassword(password) === hashedPassword;
};
