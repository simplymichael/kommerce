import env from '../.env';
import { hashPassword } from '../utils/auth';
import { isRegistrationRoute } from '../utils/route';
import { isValidEmail, isValidPassword } from '../utils/validator';

const middleware = (req, res, next) => {
  if(!isRegistrationRoute(req)) {
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

  req.body.password = hashPassword(req.body.password);

  next();
};

function findUserByEmail(email) {
  return !email; // TO DO: implement
}

export default middleware;
