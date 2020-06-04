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
    distinctItems: 'Distinct items in your Cart',
    fetchItemsError: 'Error fetching cart items. Refresh the page to try again.',
    noItems: 'Your cart is currently empty',
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
  category: {
    fetchCategoriesError: 'Error retrieving categories. Please, try again',
  },
  checkout: {
    header: 'Checkout',
    enterDetailsMessage: `Please enter your details below
                          to complete your purchase.`,
    billingAddressHeader: 'Billing Address',
    paymetMethodHeader: 'Payment Method',
    placeOrderButton: {
      text: 'Place order',
      title: 'Click to place your order',
    },
    reviewOrder: 'Review your order',
    placeOrderError: `There was an error processing your request.
                      Please try again.`,
    getCartPriceError: `Unable to get the price for your order.
                        Refresh the page, and try again`,
    getCartItemsError: `Unable to retrieve the items in your cart.
                        Refresh the page to try again`,
    continueShopping: 'Continue shopping',
  },
  currency: {
    name: 'dollar',
    symbol: '$',
  },
  footer: {
    productsHeader: 'Latest Products',
    fetchRecentProductsError: 'Error retrieving products. Please, try again',
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
    countProductsError: 'Error getting products count. Please, try again',
    fetchProductsError: 'Error retrieving products. Please, try again',
    fetchDetailsError: `Error in retrieving product details.
    Please refresh the page to try again`,
    addReviewButton: {
      text: 'Add review',
      title: 'Click to submit your review',
    },
    reviews: {
      header: 'Product reviews',
      addReviewHeader: 'Add a review',
      addReviewError: 'Error submitting your review. Please, try again',
      fetchReviewsError: 'Error retrieving reviews for this product',
      noReviewsYet: `There are no reviews yet for this product.
                     Be the first to add a review.`
    }
  },
  search: {
    error: 'An error occurred while searching. Please, try again',
    text: 'Type in your search, and hit the Enter button',
  },
  shop: {
    browse: 'Browser our shop',
  }
};
