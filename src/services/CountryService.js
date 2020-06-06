import Service from './Service';

const route = { url: '/countries', method: 'get', isProtected: false };

class CountryService extends Service {
  getCountries() {
    return this.request(route)
      .then(result => result)
      .catch(err => {
        throw err;
      });
  }

  getByName(name) {
    const path = {
      ...route,
      url: `${route.url}?country=:name`
    };

    return this.request(path, { name })
      .then(countries => countries.shift())
      .catch(err => {
        throw err;
      });
  }
}

export default CountryService;
