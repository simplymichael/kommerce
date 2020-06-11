export const checkout = () => ({
  pageMeta: {
    title: 'Checkout',
    description: 'Responsive E-commerce store front, made with React.',
    keywords: [ 'shop','commerce',  'e-commerce' ],
  },
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
});
