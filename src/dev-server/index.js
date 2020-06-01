import jsonServer from 'json-server';
import env from './.env';

import { generateAuthToken } from './utils/auth';

import authenticationMiddleware from './middlewares/auth-middleware';
import dateAddedMiddleware from './middlewares/date-added-middleware';
import registrationMiddleware from './middlewares/registration-middleware';
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
server.use(registrationMiddleware); // validate registration data
server.use(dateAddedMiddleware); // Add creation date to POST requests
server.use(productsMiddleware); // embed product-reviews in /products request
server.use(queryStringMiddleware);
server.use(jsonServer.rewriter(routes)); // Support custom routes
server.use(router); // Use default router

// Customise response
router.render = (req, res) => {
  // If the request is for new user registrations
  if(req.path.indexOf('/users') === 0 && req.method.toLowerCase() === 'post') {
    const { id: userId, email } = res.locals.data;
    const { token, expiry } = generateAuthToken(userId, email);

    res.jsonp({
      user: res.locals.data,
      accessToken: `Bearer ${token}`,
      expiresIn: expiry,
    });

    return;
  }

  // If the request is for retrieving users' data,
  // remove their password from the returned result
  if(req.path.indexOf('/users') === 0) {
    let users;
    const data = res.locals.data;

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
  }

  // Otherwise, just send the normal response
  res.end(JSON.stringify(res.locals.data));
};

server.listen(port, () => {
  console.log(`JSON Server is running on port: ${port}`);
});
