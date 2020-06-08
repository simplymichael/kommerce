import { cleanup } from '@testing-library/react';
import Service from '../../services/Service';

afterEach(cleanup);

describe('Service', () => {
  describe('Constructor', () => {
    it('Sets host to localhost when no host is specified', () => {
      const service = new Service();
      const { host } = service.getApiData();

      expect(host).toBe('http://localhost');
    });

    it('Sets port to 80 when no port is specified', () => {
      const service = new Service();
      const { port } = service.getApiData();

      expect(port).toBe(80);
    });

    it('Sets host to specified host if one is specified', () => {
      const serviceHost = 'http://www.openservice.com';
      const service = new Service(serviceHost);
      const { host } = service.getApiData();

      expect(host).toBe(serviceHost);
    });

    it('Sets port to specified port if one is specified', () => {
      const servicePort = 8080;
      const service = new Service(null, servicePort);
      const { port } = service.getApiData();

      expect(port).toBe(servicePort);
    });

    it('Sets host and port to specified if they are both specified', () => {
      const serviceHost = 'http://www.openservice.com';
      const servicePort = 8080;
      const service = new Service(serviceHost, servicePort);
      const { host, port } = service.getApiData();

      expect(host).toBe(serviceHost);
      expect(port).toBe(servicePort);
    });
  });

  describe('setApiData', () => {
    it('Sets host to specified host', () => {
      const defaultHost = 'http://localhost';
      const serviceHost = 'http://www.openservice.com';
      const service = new Service();

      expect(service.getApiData().host).toBe(defaultHost);

      service.setApiData({ host: serviceHost });

      expect(service.getApiData().host).toBe(serviceHost);
    });

    it('Sets port to specified port', () => {
      const defaultPort = 80;
      const servicePort = 8080;
      const service = new Service();

      expect(service.getApiData().port).toBe(defaultPort);

      service.setApiData({ port: servicePort });

      expect(service.getApiData().port).toBe(servicePort);
    });
  });

  describe('getApiData', () => {
    it('Returns the API service\'s "host" and "port"', () => {
      const service = new Service();
      const apiData = service.getApiData();
      const serviceHost = 'http://www.openservice.com';
      const servicePort = 8080;

      expect(apiData).toHaveProperty('host');
      expect(apiData).toHaveProperty('port');
      expect(apiData).toMatchObject({ host: 'http://localhost', port: 80 });

      service.setApiData({ host: serviceHost, port: servicePort });

      expect(service.getApiData()).toMatchObject(
        { host: serviceHost, port: servicePort });
    });
  });
});
