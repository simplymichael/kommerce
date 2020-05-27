export default {
  appName: 'Kommerce',
  cart: {
    addButtonString: 'Add to Cart',
    removeButtonString: 'Remove from cart',
  },
  currency: {
    name: 'dollar',
    symbol: '$',
  },
  priceRangeSelector: {
    min   : 0,
    max   : 500,
    step  : 1,
    currency: '$',
    initialMinValue : 0,
    initialMaxValue : 500,
  },
  product: {
    notFound: 'The product you are looking for was not found',
    fetchDetailsError: `Error in retrieving product details.
    Please refresh the page to try again`,
    reviews: {
      header: 'Product reviews',
      addHeader: 'Add a review',
    }
  },
  footer: {
    productsHeader: 'Latest Products'
  }
};
