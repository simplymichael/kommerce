import Service from './Service';
import { getLeadingQueryStringChar } from '../utils/url';

const route = { url: '/products', method: 'get', isProtected: false };
const defaultLimit = 10;

class ProductService extends Service {
  getProducts(queryData = {}) {
    const {
      page = 1,
      limit = 10,
      colors = [],
      sizes = [],
      brands = [],
      orderBy = {}, // price, dateAdded,
      priceRange = {}, // properties: min (number), max (number)
      categories = [],

      // When we are in active search, using the search form,
      // we want the pagination results to be related to the search term
      searchTerm = '',
    } = queryData;

    let path = { ...route };
    const reqPage = (parseInt(page) <= 0 ? 1 : parseInt(page));
    const reqLimit = (parseInt(limit) <= 0 ? defaultLimit : parseInt(limit));
    const reqData = { page: reqPage, limit: reqLimit };
    let pathString = '';

    if(colors.length) {
      if(colors.length === 1) {
        reqData.color = colors;
      } else {
        const colorPaths = colors.map(color => encodeURIComponent(color));
        pathString += getLeadingQueryStringChar(pathString);
        pathString += `color=${colorPaths.shift()}&color=`;
        pathString += colorPaths.join('&color=');

        path.url += pathString;
      }
    }

    if(sizes.length) {
      if(sizes.length === 1) {
        reqData.size = sizes;
      } else {
        const sizePaths = sizes.map(size => encodeURIComponent(size));
        pathString += getLeadingQueryStringChar(pathString);
        pathString += `size=${sizePaths.shift()}&size=`;
        pathString += sizePaths.join('&size=');

        path.url += pathString;
      }
    }

    if(brands.length) {
      if(brands.length === 1) {
        reqData.brand = brands;
      } else {
        const brandPaths = brands.map(brand => encodeURIComponent(brand));
        pathString += getLeadingQueryStringChar(pathString);
        pathString += `brand=${brandPaths.shift()}&brand=`;
        pathString += brandPaths.join('&brand=');

        path.url += pathString;
      }
    }

    if(Object.keys(orderBy).length) {
      reqData.sort = '';
      reqData.order = '';
    }
    if(priceRange.min && priceRange.max && priceRange.max > priceRange.min) {
      const { min, max } = priceRange;
      pathString += getLeadingQueryStringChar(pathString);
      pathString += `price_gte=${min}&price_lte=${max}`;

      path.url += pathString;
    }

    if(categories.length) {
      if(categories.length === 1) {
        pathString += getLeadingQueryStringChar(pathString);
        pathString += `category_like=${categories.shift().replace('-', ' ')}`;
      } else {
        const catPaths = categories.map(cat =>
          encodeURIComponent(cat.replace('-', ' ')));

        pathString += getLeadingQueryStringChar(pathString);
        pathString += `category_like=${catPaths.shift()}&category_like=`;
        pathString += catPaths.join('&category_like=');
      }

      path.url += pathString;
    }

    if(searchTerm) {
      reqData['q'] = searchTerm;
    }

    return this.request(path, reqData)
      .then(result => result)
      .catch(err => {
        throw err;
      });
  }

  /*getLatestProducts(count) {
    return this.getProducts({
      orderBy: {},
      limit: count
    });
  }*/

  getProduct(productId) {
    const path = { ...route, url: `${route.url}/:productId` };

    return this.request(path, { productId })
      .then(product => product)
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

  addProductReview(productId, reviewData) {
    const { author, body, rating } = reviewData;
    const path = {
      ...route,
      url: `${route.url}/:productId/reviews`,
      method: 'post'
    };

    const postData = {
      productId,
      body: {
        productId,
        author,
        rating,
        body,
      }
    };

    return this.request(path, postData)
      .then(review => review)
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

  searchProducts(queryData = {}) {
    const path = { ...route };
    const {
      query = '',
      page = 1,
      limit = 10,
    } = queryData;

    const reqPage = (parseInt(page) <= 0 ? 1 : parseInt(page));
    const reqLimit = (parseInt(limit) <= 0 ? defaultLimit : parseInt(limit));
    const reqData = {
      q: query,
      page: reqPage,
      limit: reqLimit
    };

    return this.request(path, reqData)
      .then(result => result)
      .catch(err => {
        throw err;
      });
  }
}

export default ProductService;
