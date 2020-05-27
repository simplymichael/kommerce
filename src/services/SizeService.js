import Service from './Service';

class SizeService extends Service {
  getSizes(params) {
    const route = { url: '/sizes', method: 'get', isProtected: false };

    return this
      .request(route, params)
      .then(sizes => sizes)
      .catch(err => {
        throw err;
      });
  }
}

export default SizeService;
