import { isUserDetailsWithTokenRoute } from '../utils/route';

const middleware = (req, res, next) => {
  if(!isUserDetailsWithTokenRoute(req)) {
    next();
    return;
  }

  // The currentUser key is added to the request body
  // by the auth-middleware
  // after the user's access token is authenticated and decoded.
  const { currentUser: { id, email } } = req.body;

  req.body.filter = req.body.filter || {};
  req.body.filter.usersBy = req.body.filter.usersBy || {};
  req.body.filter.usersBy.email = email;
  req.body.filter.usersBy.id = id;

  next();
};

export default middleware;
