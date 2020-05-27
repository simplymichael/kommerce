import config from '../config';
import Service from '../services/Service';

import { sagas as brandSagas } from './brands';
import { sagas as colorSagas } from './colors';
import { sagas as productSagas } from './products';
import { sagas as sizeSagas } from './sizes';

const apiCreds = config.api;
const sagas = [
  {
    factory: brandSagas,
    service: 'BrandService',
    apiCreds,
  },
  {
    factory: colorSagas,
    service: 'ColorService',
    apiCreds,
  },
  {
    factory: productSagas,
    service: 'ProductService',
    apiCreds,
  },
  {
    factory: sizeSagas,
    service: 'SizeService',
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
