import { verifyAuthToken } from '../utils/auth';

const middleware = async (req, res, next) => {
  // If the request is not to a protected route,
  // pass on to the request
  if(!isProtected(req)) {
    next();
    return;
  }

  try {
    const userKey = req.headers['authorization'];
    const error = new Error('Unauthorized access');

    if(!userKey) {
      throw error;
    }

    const [bearerText, bearerToken] = userKey.split(' ');

    if((bearerText !== 'Bearer') || !bearerToken) {
      throw error;
    }

    const decoded = await verifyAuthToken(bearerToken);

    if(!decoded) {
      throw error;
    }

    const { userId, email } = decoded;

    // If trying to get a user's details,
    // then it must be your own user details, not another person's
    if(isUserDetailsPath(req.path)) {
      const pathId = parseInt(req.path.split('/').pop());

      if(pathId !== userId) {
        throw error;
      }
    }

    req.body = req.body || {};
    req.body.currentUser = {
      id: userId,
      email: email,
    };

    next();
  } catch(err) {
    res.status(401).jsonp({
      error: err.message,
    });
  }
};

function isProtected(req) {
  // route for getting data of current user data
  // if their access token has not expired, so they don't have to relogin
  if(isUserDetailsPath(req.path)) {
    return true;
  }

  return false;
}

function isUserDetailsPath(path) {
  return /^\/users\/\d/.test(path);
}

export default middleware;
