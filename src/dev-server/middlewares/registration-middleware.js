import env from '../.env';
import { hashPassword } from '../utils/auth';
import { findByEmail } from '../utils/user';
import { isRegistrationRoute } from '../utils/route';
import { isValidEmail, isValidPassword } from '../utils/validator';

const middleware = async (req, res, next) => {
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
  if(await findByEmail(email)) {
    res.status(403).jsonp({
      error: 'The email you are trying to use is unavailable!'
    });

    return;
  }

  req.body.password = hashPassword(req.body.password);

  next();
};

export default middleware;
