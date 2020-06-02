export const isUsersRoute = req => req.path.indexOf('/users') === 0;

export const isLoginRoute = req =>
  /^\/users\/login\/?$/.test(req.path) && req.method.toLowerCase() === 'post';

export const isRegistrationRoute = req =>
  /^\/users\/?$/.test(req.path) && req.method.toLowerCase() === 'post';
