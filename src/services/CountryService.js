import Service from './Service';

const route = { url: '/countries', method: 'get', isProtected: false };

class CountryService extends Service {
  getCountries() {
    return this.request(route)
      .then(countries => countries.map(country => {
        return {
          code: country.country,
          name: country.country,
        };
      }))
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

  getStates(country) {
    return this.getByName(country)
      .then(country => country.states.map(state => {
        return {
          code: state,
          name: state,
        };
      }))
      .catch(err => {
        throw err;
      });
  }
}

export default CountryService;
