import cookies from './cookies';

export const cacheUser = (data, ttl) => {
  let saved = {
    data,
  };

  if(ttl) {
    saved.expiry = Date.now() + parseInt(ttl);
  }

  localStorage.setItem('user', JSON.stringify(saved));
};

export const getCachedUser = (key) => {
  try {
    const storedData = JSON.parse(localStorage.getItem('user'));

    if(storedData && typeof storedData === 'object') {
      if (storedData.expiry && (Date.now() > storedData.expiry)) {
        localStorage.removeItem('user');
        return null;
      }

      const userData = storedData.data;

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
