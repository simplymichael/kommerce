import Service from './Service';

const route = { url: '/users', method: 'get', isProtected: false };

class UserService extends Service {
  createUser(userData) {
    const path = {
      ...route,
      method: 'post'
    };

    const creationData = {
      ...userData,
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
      ...userData,
    };

    return this.request(path, loginData)
      .then(response => response)
      .catch(err => {
        throw err;
      });
  }

  getCurrentUserData(accessToken) {
    const path = {
      ...route,
      method: 'post',
      isProtected: true
    };

    return this.request(path, { accessToken })
      .then(response => response)
      .catch(err => {
        throw err;
      });
  }
}

export default UserService;
