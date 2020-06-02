export const isUsersRoute = req => req.path.indexOf('/users') === 0;

export const isLoginRoute = req =>
  /^\/users\/login\/?$/.test(req.path) && req.method.toLowerCase() === 'post';

export const isRegistrationRoute = req =>
  /^\/users\/?$/.test(req.path) && req.method.toLowerCase() === 'post';

export const isUserDetailsRoute = req => {
  return /^\/users\/\d/.test(req.path);
};

export const isProtectedRoute = req => {
  // route for getting data of current user data
  // if their access token has not expired, so they don't have to relogin
  if(isUserDetailsRoute(req)) {
    return true;
  }

  return false;
};
