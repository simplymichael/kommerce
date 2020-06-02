import { verifyAuthToken } from '../utils/auth';
import { isUserDetailsRoute, isProtectedRoute } from '../utils/route';

const middleware = async (req, res, next) => {
  // If the request is not to a protected route,
  // pass on to the request
  if(!isProtectedRoute(req)) {
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
    if(isUserDetailsRoute(req)) {
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

export default middleware;
