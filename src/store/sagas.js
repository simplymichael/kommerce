import config from '../config';
import Service from '../services/Service';

import { sagas as brandSagas } from './brands';
import { sagas as productSagas } from './products';

const apiCreds = config.api;
const sagas = [
  {
    factory: brandSagas,
    service: 'BrandService',
    apiCreds,
  },
  {
    factory: productSagas,
    service: 'ProductService',
    apiCreds,
  }
];

const run = sagas => sagas.forEach(({ factory, service, apiCredentials }) => {
  factory(Service.getService(service, apiCredentials));
});

export {
  sagas,
  run,
};
