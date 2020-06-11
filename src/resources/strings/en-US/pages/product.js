export const product = (product) => ({
  pageMeta: {
    title: product.name || 'product details',
    description: 'Responsive E-commerce store front, made with React.',
    keywords: [ 'shop','commerce',  'e-commerce' ],
  },
  linkTitle: `Click to view details for ${product.name}`,
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
});
