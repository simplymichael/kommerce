import Service from './Service';

class ColorService extends Service {
  getColors(params) {
    const route = { url: '/colors', method: 'get', isProtected: false };

    return this
      .request(route, params)
      .then(colors => colors)
      .catch(err => {
        throw err;
      });
  }
}

export default ColorService;
