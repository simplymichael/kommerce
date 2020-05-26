import Service from './Service';

const route = { url: '/products', method: 'get', isProtected: false };

class ProductService extends Service {
  getProducts(queryData = {}) {
    const {
      page = 1,
      limit = 10,
      color = '',
      size = '',
      brands = [],
      orderBy = {}, // price, dateAdded,
      priceRange = {}, // properties: min (number), max (number)
    } = queryData;

    let path = { ...route };
    const reqPage = (parseInt(page) <= 0 ? 1 : parseInt(page));
    const reqLimit = (parseInt(limit) <= 0 ? 10 : parseInt(limit));
    const reqData = { page: reqPage, limit: reqLimit };

    if(color) {
      reqData.color = color;
    }
    if(size) {
      reqData.size = size;
    }
    if(brands.length) {
      if(brands.length === 1) {
        reqData.brand = brands;
      } else {
        const paths = brands.map(brand => encodeURIComponent(brand));
        const pathString = paths.join('&brand=');

        path.url += `/?brand=${pathString}`;
      }
    }
    if(Object.keys(orderBy).length) {
      reqData.sort = '';
      reqData.order = '';
    }
    if(Object.keys(priceRange).length) {
      //reqData.price = '';
    }

    return this.request(path, reqData)
      .then(result => result)
      .catch(err => {
        throw err;
      });
  }

  getLatestProducts(count) {
    return this.getProducts({
      orderBy: {},
      limit: count
    });
  }

  getProduct(productId) {
    const path = { ...route, url: `${route.url}/:productId` };

    return this.request(path, { productId })
      .then(products => products)
      .catch(err => {
        throw err;
      });
  }

  getRelatedProducts(productId) {
    const path = { ...route, url: `${route.url}/:productId/related` };

    return this.request(path, { productId })
      .then(products => products)
      .catch(err => {
        throw err;
      });
  }

  getProductReviews(productId) {
    const path = { ...route, url: `${route.url}/:productId/reviews` };

    return this.request(path, { productId })
      .then(reviews => reviews)
      .catch(err => {
        throw err;
      });
  }

  addProductReview(productId, reviewData) {
    const { authorName, reviewText, rating } = reviewData;
    const path = {
      ...route,
      url: `${route.url}/:productId/reviews`,
      method: 'post'
    };

    return this.request(path, { productId, authorName, reviewText, rating })
      .then(reviews => reviews)
      .catch(err => {
        throw err;
      });
  }
}

export default ProductService;
