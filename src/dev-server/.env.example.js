const env = {
  host: {
    port: 3001,
  },

  auth: {
    tokenKey: 'secret', // Access token key
    tokenExpiry: 60 * 60 * 24, // Access token expiry, in seconds,
    minPasswordLength: 8,
  },
};

export default env;
