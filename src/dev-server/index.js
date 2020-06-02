import jsonServer from 'json-server';
import env from './.env';
import db from './utils/db';

import { generateAuthToken } from './utils/auth';
import * as routeHelper from './utils/route';

import authenticationMiddleware from './middlewares/auth-middleware';
import dateAddedMiddleware from './middlewares/date-added-middleware';
import loginMiddleware from './middlewares/login-middleware';
import registrationMiddleware from './middlewares/registration-middleware';
import usersFilterMiddleware from './middlewares/users-filter-middleware';
import productsMiddleware from './middlewares/products-middleware';
import queryStringMiddleware from './middlewares/query-string-middleware';

const server = jsonServer.create();
const router = jsonServer.router('src/__DATA__/api.json');
const defaults = jsonServer.defaults();
const port = env.host.port || 3001;
const routes = require('./routes'); // Defines our custom routes

server.use(defaults); // default middlewares (logger, static, cors, no-cache)
server.use(jsonServer.bodyParser); // parse POST, PUT and PATCH requests body
server.use(authenticationMiddleware); // guard protected routes
server.use(loginMiddleware); // validate login data
server.use(registrationMiddleware); // validate registration data
server.use(usersFilterMiddleware); // filter users by name, email, password, etc
server.use(dateAddedMiddleware); // Add creation date to POST requests
server.use(productsMiddleware); // embed product-reviews in /products request
server.use(queryStringMiddleware);
server.use(jsonServer.rewriter(routes)); // Support custom routes
server.use(router); // Use default router

// Customise response
router.render = (req, res) => {
  // If the request is for new user registrations
  if(routeHelper.isRegistrationRoute(req)) {
    const { id: userId, email } = res.locals.data;
    const { token, expiry } = generateAuthToken(userId, email);
    const userData = res.locals.data;
    const user = { ...userData };

    // concatenate the new user to the in-memory db.
    // We need this because our imported db is cached,
    // and is not aware of this new record.
    // Without this awareness,
    // our login implementation will not work as desired.
    // Cf. the ./utils/db.js file for more info.
    //
    // We sync a clone of the new user
    // because we will be deleting the user's password before
    // sending the response back.
    // But we need the password in the internal db for the login implementation.
    db.syncUser({ ...user });

    delete user.password; // Strip the password from the response

    res.jsonp({
      user,
      accessToken: `Bearer ${token}`,
      expiresIn: expiry,
    });

    return;
  }

  // If the request is for new user login
  if(routeHelper.isLoginRoute(req)) {
    if(req.body.filter.users.length === 0) {
      // No match found for email + password combination
      res.status(404).jsonp({
        error: 'Invalid login credentials!'
      });

      return;
    }

    const userData = req.body.filter.users.shift();
    const user = { ...userData };
    const { token, expiry } = generateAuthToken(user.id, user.email);

    delete user.password; // Remove the user's password from the response

    res.status(200).jsonp({
      user,
      accessToken: `Bearer ${token}`,
      expiresIn: expiry,
    });

    return;
  }

  // If the request is for retrieving users' data,
  // remove their password from the returned result
  if(routeHelper.isUsersRoute(req)) {
    let users;
    const allUsers = res.locals.data ;
    const data = Array.isArray(allUsers) ? allUsers.slice() : { ...allUsers };

    if(Array.isArray(data)) {
      // We are retrieving an array of users
      users = data.map(user => {
        delete user.password;
        return user;
      });
    } else {
      // We are retrieving data for a single user
      users = { ...data };
      delete users.password;
    }

    res.end(JSON.stringify(users));
    return;
  }

  // Otherwise, just send the normal response
  res.end(JSON.stringify(res.locals.data));
};

server.listen(port, () => {
  console.log(`JSON Server is running on port: ${port}`);
});
