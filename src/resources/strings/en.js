export default {
  appName: 'Kommerce',
  cart: {
    addToCart: {
      text: 'Add to cart',
      title: 'Add to Cart',
    },
    checkout: {
      text: 'Checkout',
      title: 'Click to go to checkout page'
    },
    clearCart: {
      text: 'Empty cart',
      title: 'Click to empty the cart',
    },
    countItemsError: 'Error fetching number of items in cart',
    removeFromCart: {
      text: 'Remove',
      title: 'Remove from cart',
    },
    itemSummary: {
      itemHeader: 'Item',
      priceHeader: 'Price',
      quantityHeader: 'Quantity',
      sizeHeader: 'Size',
    },
  },
  checkout: {
    header: 'Checkout',
    enterDetailsMessage: `Please enter your details below
                          to complete your purchase.`,
    billingAddressHeader: 'Billing Address',
    paymetMethodHeader: 'Payment Method',
    placeOrder: 'Place order',
    reviewOrder: 'Review your order',
    placeOrderError: `There was an error processing your request.
                      Please try again.`,
    getCartPriceError: `Unable to get the price for your order.
                        Refresh the page, and try again`,
    continueShopping: 'Continue shopping',
  },
  currency: {
    name: 'dollar',
    symbol: '$',
  },
  footer: {
    productsHeader: 'Latest Products'
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
    linkTitle: 'Click to view product details',
    notFound: 'The product you are looking for was not found',
    fetchDetailsError: `Error in retrieving product details.
    Please refresh the page to try again`,
    reviews: {
      header: 'Product reviews',
      addHeader: 'Add a review',
    }
  },
};
