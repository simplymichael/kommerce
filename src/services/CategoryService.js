import Service from './Service';

const route = { url: '/categories', method: 'get', isProtected: false };

class CategoryService extends Service {
  getCategories(queryParams) {
    const path = { ...route };
    return this.request(path, queryParams)
      .then(categories => categories)
      .catch(err => {
        throw err;
      });
  }

  getCategoryData(categoryId) {
    const path = {
      ...route,
      url: `${route.url}/:categoryId`
    };

    return this.request(path, { categoryId })
      .then(category => category)
      .catch(err => {
        throw err;
      });
  }
}

export default CategoryService;
