// eslint-disable-next-line
module.exports = {
  '/api/*': '/$1',
  /*'/products': '/products?_embed=product-reviews',
  '/products?page=*': '/products/?_page=$1&_embed=product-reviews',
  '/products?limit=*': '/products/?_limit=$1&_embed=product-reviews',
  '/products?page=:p&limit=:l': '/products/?_page=:p&_limit=:l',
  '/products/:id': '/products/:id?_embed=product-reviews',*/
  '/products/:id/reviews': '/product-reviews?productId=:id'
};
