import Service from './Service';

class BrandService extends Service {
  getBrands(params) {
    const route = {
      url: '/brands',
      method: 'get',
      isProtected: false,
    };

    return this
      .request(route, params)
      .then(brands => brands)
      .catch(err => {
        throw err;
      });
  }
}

export default BrandService;
