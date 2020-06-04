import 'whatwg-fetch';

/**
 * Make an HTTP request
 * by wrapping the whatwg-fetch window.fetch() call
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
 *
 * @param authToken string authorization token for making request to protected resources 
 */
function request(route, params, authToken) {
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

export default {
  request,
};
