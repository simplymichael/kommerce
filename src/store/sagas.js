import Service from '../services/Service';

import { sagas as brandSagas } from './brands';
import { sagas as productSagas } from './products';

const sagas = [
  {
    factory: brandSagas,
    service: 'BrandService',
  },
  {
    factory: productSagas,
    service: 'ProductService',
  }
];

const run = sagas => sagas.forEach(({ factory, service }) => {
  factory(Service.getService(service));
});

export {
  sagas,
  run,
};
