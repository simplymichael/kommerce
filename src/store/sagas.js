import config from '../config';
import Service from '../services/Service';

import { sagas as brandSagas } from './brands';
import { sagas as cartSagas } from './cart';
import { sagas as colorSagas } from './colors';
import { sagas as priceSagas } from './prices';
import { sagas as productSagas } from './products';
import { sagas as sizeSagas } from './sizes';

const apiCredentials = config.api;
const sagas = [
  {
    factory: brandSagas,
    service: 'BrandService',
    apiCredentials,
  },
  {
    factory: cartSagas,
    service: 'CartService',
    apiCredentials,
  },
  {
    factory: colorSagas,
    service: 'ColorService',
    apiCredentials,
  },
  {
    factory: priceSagas,
    service: null,
    apiCredentials,
  },
  {
    factory: productSagas,
    service: 'ProductService',
    apiCredentials,
  },
  {
    factory: sizeSagas,
    service: 'SizeService',
    apiCredentials,
  }
];

const run = sagas => sagas.forEach(({ factory, service, apiCredentials }) => {
  if(service) {
    factory(Service.getService(service, apiCredentials));
  } else {
    factory();
  }
});

export {
  sagas,
  run,
};
