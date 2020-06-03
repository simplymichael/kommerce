export const isUsersRoute = req => req.path.indexOf('/user') === 0;

export const isLoginRoute = req =>
  /^\/users\/login\/?$/.test(req.path) && req.method.toLowerCase() === 'post';

export const isRegistrationRoute = req =>
  /^\/users\/?$/.test(req.path) && req.method.toLowerCase() === 'post';

// Route for getting data of current user data using their Id (/users/:id)
// if their access token has not expired
export const isUserDetailsRoute = req => {
  return /^\/users\/\d/.test(req.path);
};

// Route (/user) for getting the current user's details
// using their access token without their id or any other login credentials.
// This is so they don't have to relogin if their token has not expired.
// The access token is sent in the Authorization header:
// GET /user
// Headers: { Authorization: Bearer <accessToken>, ... }
export const isUserDetailsWithTokenRoute = req => {
  return req.path === '/user' && req.method.toLowerCase() === 'get';
};

export const isProtectedRoute = req => {
  if(isUserDetailsRoute(req)) {
    return true;
  }

  if(isUserDetailsWithTokenRoute(req)) {
    return true;
  }

  return false;
};

// Every route for counting things
// /count/<products|categores|users|...>
export const isCountRoute = req =>
  /\/count\/?$/i.test(req.path) && req.method.toLowerCase() === 'get';

// Every resource creation (POST requests) route
export const isResourceCreationRoute = req =>
  !isLoginRoute(req) && req.method.toLowerCase() === 'post';
