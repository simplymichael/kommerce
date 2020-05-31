import cookies from './cookies';

export const cacheUser = (data) => {
  localStorage.setItem('user', JSON.stringify(data));
};

export const getCachedUser = (key) => {
  try {
    const userData = JSON.parse(localStorage.getItem('user'));

    if(userData && typeof userData === 'object') {
      return key ? userData[key] : userData;
    } else {
      return null;
    }
  } catch(e) {
    return null;
  }
};

export const clearCachedUser = () => {
  localStorage.removeItem('user');
};

export const saveAuthToken = ({ token, expires }) => {
  const expiry = parseInt(expires, 10);

  cookies.set('accessToken', token, {
    path: '/',
    maxAge: expiry,
    //expires: new Date(Date.now() + expiry), // OR
    //expires: new Date(Date.now() + 2592000) // 2592000 -> 30 days
  });
};

export const getSavedAuthToken = () => {
  return cookies.get('accessToken');
};
