import pages from './pages';


export default {
  appName: 'Kommerce',
  currency: { name: 'dollar', symbol: '$' },
  footer: {
    productsHeader: 'Latest Products',
    fetchRecentProductsError: 'Error retrieving products. Please, try again',
  },
  priceRangeSelector: {
    min   : 10,
    max   : 2000,
    step  : 1,
    currency: '$',
    initialMinValue : 10,
    initialMaxValue : 2000,
  },
  shop: {
    browse: 'Browser our shop',
  },
  pages,
};
