import http from '../utils/http';

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
   */
  request(route, params) {
    const { host: apiHost, port: apiPort } = this.getApiData();
    const { host = apiHost, port = apiPort } = route;
    const requestPath = route.url;
    const baseUrl = (port ? [host, port] : [host]).join(':');
    const requestUrl = [baseUrl, requestPath].join(
      requestPath.charAt(0) === '/' ? '' : '/');
    const computedRoute = { ...route, url: requestUrl };

    for(const key in computedRoute) {
      if(!(['url', 'method', 'isProtected'].includes(key))) {
        delete computedRoute[key];
      }
    }

    return http.request(computedRoute, params)
      .then(json => json)
      .catch(err => {
        console.error('Error in Service::request(): ', err);
        throw err;
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

export default Service;
