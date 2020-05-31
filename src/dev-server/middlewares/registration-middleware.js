import env from '../.env';
import { isValidEmail, isValidPassword } from '../utils/validator';

const middleware = (req, res, next) => {
  // If we are not dealing with a /users POST requres,
  // then just move on to the next middleware
  if(req.path.indexOf('/users') !== 0 || req.method.toLowerCase() !== 'post') {
    next();
    return;
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).jsonp({
      error: 'Please enter your name, email address, and password!'
    });

    return;
  }

  if(!isValidEmail(email)) {
    res.status(400).jsonp({
      error: 'Please provide a valid email address!'
    });

    return;
  }

  if (!isValidPassword(password)) {
    const minPasswordLen = env.auth.minPasswordLength;

    res.status(400).jsonp({
      error: `Your password must be at least ${minPasswordLen} characters!`
    });

    return;
  }

  // Make sure there isn't already a user registered with that email address
  if(findUserByEmail(email)) {
    res.status(400).jsonp({
      error: 'There is already a user with that email address!'
    });

    return;
  }

  next();
};

function findUserByEmail(email) {
  return !email; // TO DO: implement
}

export default middleware;
