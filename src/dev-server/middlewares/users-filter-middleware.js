import { filterBy} from '../utils/user';
import { isUsersRoute } from '../utils/route';

const middleware = async (req, res, next) => {
  // If we are not dealing with a /users request,
  // and we are not dealing with a filter request,
  // then just move on to the next middleware.
  //
  // The filtering parameters are usually set
  // by previous middlewares(e.g, the login middleware) in the middleware chain,
  // and (should) have the following structure:
  // { name: userName, email: userEmail, password: userPass, ... }
  if(!isUsersRoute(req) || !req.body.filter || !req.body.filter.usersBy) {
    next();
    return;
  }

  req.body = req.body || {};
  req.body.filter.users = await filterBy(req.body.filter.usersBy);

  next();
};

export default middleware;
