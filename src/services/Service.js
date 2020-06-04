import http from '../utils/http';
import { getAccessToken, deleteAccessToken } from '../utils/auth';

class Service {
  static getService(serviceName, {host, port} = {}) {
    const RequestedService = require('./' + serviceName)['default'];

    return new RequestedService(host, port);
  }

  constructor(host = 'http://localhost', port = 80) {
    this.api = {};
    this.setApiData({ host, port });
  }

  setApiData({ host, port }) {
    this._setApiHost(host);
    this._setApiPort(port);
  }

  getApiData() {
    return this.api;
  }

  /**
   * @method request - Make http requests to remote urls
   *
   * @param route object, e.g: {
   *   host: "http://localhost:3000", // request host or backend service url
   *   port: 3000, //request host's port
   *   url: "posts/:postId", // request url endpoint with placeholders allowed
   *   method: "GET|POST|PUT|DELETE",
   *   isProtected: true | false
   * }
   *
   * @param params object, e.g: {
   *    postId: 5, // Will replace :postId with 5 in route.url when post is made
   *    name: "James" // will be appended to query string, since no matching placeholder exists in route.url
   *    body: { ... } // appended to request body for POST|PUT requests
   * }
   *
   * @param options optional object with properties:
   *   - responseHandler function called to handle the responses
   *     The function is passed the response object.
   *     NOTE:
   *     If this function is supplied, it is responsible for processing the response,
   *     If it is not supplied, the default handler returns the response as JSON
   */
  request(route, params, options = {}) {
    let authToken = '';
    const { host: apiHost, port: apiPort } = this.getApiData();
    const { host = apiHost, port = apiPort } = route;
    const requestPath = route.url;
    const baseUrl = (port ? [host, port] : [host]).join(':');
    const requestUrl = [baseUrl, requestPath].join(
      requestPath.charAt(0) === '/' ? '' : '/');
    const computedRoute = { ...route, url: requestUrl };
    const { responseHandler } = options;
    const responseParser = responseHandler || parseJSON;

    const redirect = path => {
      // Keeps redirecting if we are trying to fetch the user's details
      // via route (/user or /users/:id),
      // and this call is made in the main navigation header,
      // which is present on every page, so it keeps trying to
      // fetch the user's data and redirecting endlessly.
      // Fix it:
      // If we are not trying to make request to either /user or /users
      // then redirect
      if(path !== '/user') {
        return;
      }

      const url = `/signin?redirect=${encodeURIComponent(path)}`;
      window.location = url;
    };

    for(const key in computedRoute) {
      if(!(['url', 'method', 'isProtected'].includes(key))) {
        delete computedRoute[key];
      }
    }

    if(computedRoute.isProtected) {
      authToken = getAccessToken();

      if (!authToken) {
        redirect(window.location.pathname);
        return;
      }
    }

    return http.request(computedRoute, params, authToken)
      .then(checkStatus)
      .then(responseParser)
      .catch(err => {
        console.error('Error in Service::request(): ', err);

        if(requestPath === '/user' &&
           err.message.indexOf('User not found') === 0) { 
          deleteAccessToken();
        }

        if (err.message === 'Unauthorized') {
          redirect(window.location.pathname);
        } else {
          throw err;
        }
      });
  }

  _setApiHost(host) {
    if(typeof host === 'string' && host.length) {
      this.api.host = host;
    } else {
      this.api.host = 'http://localhost';
    }
  }

  _setApiPort(port) {
    if(typeof port === 'number' && port > 0) {
      this.api.port = port;
    } else {
      this.api.port = 80;
    }
  }
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
      throw new Error('Unauthorized');
    } else {
      throw new Error(error || 'API error');
    }
  });
}

/**
 * Parse JSON returned by a request
 */
function parseJSON(response) {
  return response.json();
}


export default Service;
