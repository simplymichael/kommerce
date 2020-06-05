import brands from './brands';
import categories from './categories';
import colors from './colors';
import countries from './countries-states';
import productReviews from './product-reviews';
import products from './products';
import sizes from './sizes';
import users from './users';

export default () => ({
  brands,
  categories,
  colors,
  countries,
  'product-reviews': productReviews,
  products,
  sizes,
  users
});
