import { FetchMockAdapter, withDelay } from 'fakerest';
import fetchMock from 'fetch-mock';
import { faker } from '@faker-js/faker';

// Generate mock data for customers, orders, and users
const generateMockData = () => ({
  customers: Array.from({ length: 100 }, () => ({
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    country: faker.location.country(),
  })),
  orders: Array.from({ length: 50 }, () => ({
    id: faker.string.uuid(),
    customerId: faker.string.uuid(), // Link to a customer
    orderDate: faker.date.past(),
    totalAmount: faker.commerce.price(),
    status: faker.helpers.arrayElement(['Pending', 'Shipped', 'Delivered']),
  })),
  users: [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    {
      id: 2,
      username: 'superadmin',
      password: 'superadmin123',
      role: 'superadmin',
    },
    { id: 3, username: 'user', password: 'user123', role: 'user' },
  ],
});

// Manually add X-Total-Count and Access-Control-Expose-Headers to the response
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addHeaders = (data: any[], resource: string, totalCount: number) => ({
  body: JSON.stringify(data),
  status: 200,
  headers: {
    'X-Total-Count': totalCount.toString(),
    'Access-Control-Expose-Headers': 'X-Total-Count',
  },
});

// Setup the mock server
export const setupFakeServer = (): (() => void) => {
  const data = generateMockData();
  const adapter = new FetchMockAdapter({
    baseUrl: 'http://localhost:4000', // Base URL for the API
    data,
    loggingEnabled: true,
    middlewares: [withDelay(500)], // Simulate a network delay
  });

  // Mock requests to the localhost API with headers
  fetchMock.mock('begin:http://localhost:4000/customers', (url) => {
    const start = parseInt(
      new URLSearchParams(url.split('?')[1]).get('_start') || '0'
    );
    const end = parseInt(
      new URLSearchParams(url.split('?')[1]).get('_end') ||
        data.customers.length.toString()
    );
    const paginatedCustomers = data.customers.slice(start, end);
    return addHeaders(paginatedCustomers, 'customers', data.customers.length);
  });

  fetchMock.mock('begin:http://localhost:4000/orders', (url) => {
    const start = parseInt(
      new URLSearchParams(url.split('?')[1]).get('_start') || '0'
    );
    const end = parseInt(
      new URLSearchParams(url.split('?')[1]).get('_end') ||
        data.orders.length.toString()
    );
    const paginatedOrders = data.orders.slice(start, end);
    return addHeaders(paginatedOrders, 'orders', data.orders.length);
  });

  fetchMock.mock('begin:http://localhost:4000/users', (url) => {
    const start = parseInt(
      new URLSearchParams(url.split('?')[1]).get('_start') || '0'
    );
    const end = parseInt(
      new URLSearchParams(url.split('?')[1]).get('_end') ||
        data.users.length.toString()
    );
    const paginatedUsers = data.users.slice(start, end);
    return addHeaders(paginatedUsers, 'users', data.users.length);
  });

  // Expose the fake server to the window for debugging purposes
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).restServer = adapter.server;
  }

  // Restore the original fetch behavior when the server is no longer needed
  return () => fetchMock.restore();
};
