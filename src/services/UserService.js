import Service from './Service';
import { getCachedUser } from '../utils/auth';

const route = { url: '/users', method: 'get', isProtected: false };

class UserService extends Service {
  createUser(userData) {
    const path = {
      ...route,
      method: 'post'
    };

    const creationData = {
      body: {
        ...userData,
      },
    };

    return this.request(path, creationData)
      .then(response => response)
      .catch(err => {
        throw err;
      });
  }

  loginUser(userData) {
    const path = {
      ...route,
      method: 'post'
    };

    const loginData = {
      body: {
        ...userData,
      }
    };

    return this.request(path, loginData)
      .then(response => response)
      .catch(err => {
        throw err;
      });
  }

  getCurrentUser() {
    const userId = getCachedUser('id');

    if(!userId) {
      return {};
    }

    const path = {
      ...route,
      url: `${route.url}/:userId`,
      isProtected: true
    };

    return this.request(path, { userId })
      .then(response => response)
      .catch(err => {
        throw err;
      });
  }
}

export default UserService;
