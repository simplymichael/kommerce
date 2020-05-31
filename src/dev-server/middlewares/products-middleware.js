// embed product-reviews in every request for products
const middleware = (req, res, next) => {
  if(req.path.indexOf('/products') === 0 && !req.query._embed) {
    req.query._embed = 'product-reviews';
  }

  next();
};

export default middleware;
