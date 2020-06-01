import env from '../.env';
import { isLoginRoute } from '../utils/route';
import { isValidEmail, isValidPassword } from '../utils/validator';

const middleware = (req, res, next) => {
  if(!isLoginRoute(req)) {
    next();
    return;
  }

  const { email, password } = req.body;

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

  req.body.filter = req.body.filter || {};
  req.body.filter.usersBy = req.body.filter.usersBy || {};
  req.body.filter.usersBy.email = email;
  req.body.filter.usersBy.password = password;

  next();
};

export default middleware;
