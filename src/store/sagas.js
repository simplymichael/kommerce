import env from '../.env';
import Service from '../services/Service';

import { sagas as brandSagas } from './brands';
import { sagas as cartSagas } from './cart';
import { sagas as categorySagas } from './categories';
import { sagas as colorSagas } from './colors';
import { sagas as orderSagas } from './orders';
import { sagas as priceSagas } from './prices';
import { sagas as productDetailsSagas } from './product';
import { sagas as productReviewsSagas } from './product-reviews';
import { sagas as productSagas } from './products';
import { sagas as sizeSagas } from './sizes';
import { sagas as userSagas } from './users';

const apiCredentials = env.api; 
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
    factory: categorySagas,
    service: 'CategoryService',
    apiCredentials,
  },
  {
    factory: colorSagas,
    service: 'ColorService',
    apiCredentials,
  },
  {
    factory: orderSagas,
    service: 'OrderService',
    apiCredentials,
  },
  {
    factory: priceSagas,
    service: null,
    apiCredentials,
  },
  {
    factory: productDetailsSagas,
    service: 'ProductService',
    apiCredentials,
  },
  {
    factory: productSagas,
    service: 'ProductService',
    apiCredentials,
  },
  {
    factory: productReviewsSagas,
    service: 'ProductService',
    apiCredentials,
  },
  {
    factory: sizeSagas,
    service: 'SizeService',
    apiCredentials,
  },
  {
    factory: userSagas,
    service: 'UserService',
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
