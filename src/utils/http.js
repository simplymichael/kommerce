import 'whatwg-fetch';

/**
 * Make an HTTP request
 *
 * @param route object e.g: {
 *   url: "http://localhost:3000/posts/:postId", // request url with placeholders allowed
 *   method: "GET|POST|...",
 *   isProtected: true|false
 * }
 *
 * @param params object e.g: {
 *   postId: 5, // Will replace :postId with 5 in route.url when post is made
 *   name: "James" // will be appended to query string, since no matching placeholder exists in route.url
 *   body: {} // // appended to request body for POST|PUT requests
 * }
 */
function request(route, params) {
  let token = '';

  const redirect = path => {
    const url = `/login?redirect=${encodeURIComponent(path)}`;
    window.location = url;
  };

  token = window.localStorage.getItem('authToken');

  if (route.isProtected && !token) {
    // Redirect and throw error
    redirect(window.location.pathname);
    throw new Error('not_logged_in');
  }

  return wrapFetch(route, params, token)
    .then(checkStatus)
    .then(parseJSON)
    .catch(err => {
      if (err.message === 'unauthorized') {
        redirect(window.location.pathname);
      }

      throw err;
    });
}

/**
 * wrap the whatwg-fetch window.fetch() call
 *
 * @param route object e.g: {
 *   url: "/posts/:postId",
 *   method: "GET|POST|..."
 * }
 *
 * @param params e.g: {
 *   postId: 1,
 *   body: {}
 * }
 *
 * @param authToken string
 */
function wrapFetch(route, params, authToken) {
  let computedRoute = route.url;
  const mutableParams = { ...params } || {};
  const computedOptions = {
    method: route.method.toLowerCase(),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: authToken,
    },
  };

  // Replace all named parameters in the URL
  Object.keys(mutableParams).forEach(key => {
    if (computedRoute.indexOf(`:${key}`) !== -1) {
      computedRoute = computedRoute.replace(`:${key}`,
        encodeURIComponent(mutableParams[key]));
      delete mutableParams[key];
    }
  });

  // If it's a GET request, append all other params in the query string.
  // Otherwise, attach a JSON body to'GET'POST|PUT request.
  if (route.method.toUpperCase() === 'GET') {
    const queryParams = [];
    Object.keys(mutableParams).forEach(key =>
      queryParams.push(`${key}=${encodeURIComponent(mutableParams[key])}`));

    const qs = computedRoute.indexOf('?') === -1 ? '?' : '&';
    computedRoute += ((queryParams.length)
      ? `${qs}${queryParams.join('&')}`
      : ''
    );
  } else {
    computedOptions.body = JSON.stringify(mutableParams.body);
  }

  // Process the request
  return fetch(computedRoute, computedOptions);
}

/**
 * Check the status of a returned HTTP request
 *
 * @param response object HTTP response object
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  return response.json().then(({ error }) => {
    if (response.status === 401) {
      throw new Error('unauthorized');
    } else {
      throw new Error(error || 'api_error');
    }
  });
}

/**
 * Parse JSON returned by a request
 */
function parseJSON(response) {
  return response.json();
}

export default {
  request,
};
