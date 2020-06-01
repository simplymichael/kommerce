import db from '../utils/db';
import { isUsersRoute } from '../utils/route';

const middleware = (req, res, next) => {
  // If we are not dealing with a /users request,
  // and we are not dealing with a filter request,
  // then just move on to the next middleware.
  //
  // The filtering parameters are usually set
  // by previous middlewares(e.g, the login middleware) in the middleware chain.
  if(!isUsersRoute(req) || !req.body.filter || !req.body.filter.usersBy) {
    next();
    return;
  }

  const users = db.users();
  const filters = req.body.filter.usersBy; // { name, email, password }

  const filteredUsers = users.filter(user => {
    let includeUser = true;

    for(let [key, value] of Object.entries(filters)) {
      if(user[key] !== value) {
        includeUser = false;
      }
    }

    return includeUser;
  });

  req.body = req.body || {};
  req.body.filter.users = filteredUsers;

  next();
};

export default middleware;
