import { fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

// Fetch function with authorization token
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const httpClient = (url: string, options: any = {}) => {
  const token = localStorage.getItem('auth'); // Get the auth details (including role)
  const user = token ? JSON.parse(token) : null;

  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }

  if (user) {
    options.headers.set('Authorization', `Bearer ${user.role}`); // Set Authorization with role
  }

  return fetchUtils.fetchJson(url, options);
};

// Custom data provider
const dataProvider = jsonServerProvider('http://localhost:4000', httpClient);

export default dataProvider;
