import { verifyAuthToken } from '../utils/auth';
import { isProtectedRoute } from '../utils/route';

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
