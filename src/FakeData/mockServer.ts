import { FetchMockAdapter, withDelay } from 'fakerest';
import fetchMock from 'fetch-mock';
import { faker } from '@faker-js/faker';

// Define TypeScript interfaces for each entity
interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipcode: string;
  country: string;
}

interface Order {
  id: string;
  customerId: string;
  orderDate: Date;
  totalAmount: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
}

interface User {
  id: number;
  username: string;
  password: string;
  role: 'admin' | 'superadmin' | 'user';
}

interface Content {
  id: string;
  name: string;
  category: string;
  description: string;
  videolink: string;
  image: string;
}

interface Device {
  id: string;
  devicename: string;
  type: string;
  details: string;
}

// Generate mock data for customers, orders, users, content, and devices
const generateMockData = () => ({
  customers: Array.from(
    { length: 100 },
    (): Customer => ({
      id: faker.string.uuid(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      country: faker.location.country(),
    })
  ),
  orders: Array.from(
    { length: 50 },
    (): Order => ({
      id: faker.string.uuid(),
      customerId: faker.string.uuid(), // Link to a customer
      orderDate: faker.date.past(),
      totalAmount: faker.commerce.price(),
      status: faker.helpers.arrayElement(['Pending', 'Shipped', 'Delivered']),
    })
  ),
  users: Array.from<User>([
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    {
      id: 2,
      username: 'superadmin',
      password: 'superadmin123',
      role: 'superadmin',
    },
    { id: 3, username: 'user', password: 'user123', role: 'user' },
  ]),
  content: Array.from(
    { length: 20 },
    (): Content => ({
      id: faker.string.uuid(),
      name: faker.commerce.productName(),
      category: faker.commerce.department(),
      description: faker.commerce.productDescription(),
      videolink:
        'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4', // Sample video link
      image: 'https://via.placeholder.com/150', // Sample image link
    })
  ),
  devices: Array.from(
    { length: 20 },
    (): Device => ({
      id: faker.string.uuid(),
      devicename: faker.commerce.productName(),
      type: faker.commerce.department(),
      details: faker.commerce.productDescription(),
    })
  ),
});

// Manually add X-Total-Count and Access-Control-Expose-Headers to the response
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addHeaders = (data: any[], totalCount: number) => ({
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
    return addHeaders(paginatedCustomers, data.customers.length);
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
    return addHeaders(paginatedOrders, data.orders.length);
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
    return addHeaders(paginatedUsers, data.users.length);
  });

  fetchMock.mock('begin:http://localhost:4000/content', (url) => {
    const start = parseInt(
      new URLSearchParams(url.split('?')[1]).get('_start') || '0'
    );
    const end = parseInt(
      new URLSearchParams(url.split('?')[1]).get('_end') ||
        data.content.length.toString()
    );
    const paginatedContent = data.content.slice(start, end);
    return addHeaders(paginatedContent, data.content.length);
  });

  fetchMock.mock('begin:http://localhost:4000/devices', (url) => {
    const start = parseInt(
      new URLSearchParams(url.split('?')[1]).get('_start') || '0'
    );
    const end = parseInt(
      new URLSearchParams(url.split('?')[1]).get('_end') ||
        data.devices.length.toString()
    );
    const paginatedDevices = data.devices.slice(start, end);
    return addHeaders(paginatedDevices, data.devices.length);
  });

  // Expose the fake server to the window for debugging purposes
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).restServer = adapter.server;
  }

  // Restore the original fetch behavior when the server is no longer needed
  return () => fetchMock.restore();
};
