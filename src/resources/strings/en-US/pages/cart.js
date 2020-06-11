export const cart = () => ({
  pageMeta: {
    title: 'Cart',
    description: 'Responsive E-commerce store front, made with React.',
    keywords: [ 'shop','commerce',  'e-commerce' ],
  },
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
});
