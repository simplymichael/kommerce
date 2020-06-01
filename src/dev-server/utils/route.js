export const isUsersRoute = req => req.path.indexOf('/users') === 0;

export const isLoginRoute = req =>
  req.path === '/users/login' && req.method.toLowerCase() === 'post';

export const isRegistrationRoute = req =>
  req.path === '/users' && req.method.toLowerCase() === 'post';
