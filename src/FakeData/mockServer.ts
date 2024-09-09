import { FetchMockAdapter, withDelay } from 'fakerest';
import fetchMock from 'fetch-mock';
import { faker } from '@faker-js/faker';

// Define types for customers, products, and orders
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

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
  description: string;
  stock: number;
}

interface Order {
  id: string;
  customer_id: string;
  product_id: string;
  date: Date;
  total: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
}

// Generate mock data with proper types
const generateMockData = () => ({
  customers: Array.from<Partial<Customer>, Customer>({ length: 100 }, () => ({
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
  products: Array.from<Partial<Product>, Product>({ length: 50 }, () => ({
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    stock: faker.number.int({ min: 1, max: 100 }),
  })),
  orders: Array.from<Partial<Order>, Order>({ length: 200 }, () => ({
    id: faker.string.uuid(),
    customer_id: faker.string.uuid(),
    product_id: faker.string.uuid(),
    date: faker.date.past(),
    total: faker.commerce.price(),
    status: faker.helpers.arrayElement(['Pending', 'Shipped', 'Delivered']),
  })),
});

// Setup fake server
export const setupFakeServer = (): (() => void) => {
  const data = generateMockData();
  const adapter = new FetchMockAdapter({
    baseUrl: 'http://localhost:4000',
    data,
    loggingEnabled: true,
    middlewares: [withDelay(500)], // Add a 500ms delay for network simulation
  });

  // Expose the fake server to the window for debugging
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).restServer = adapter.server;
  }

  // Mock requests to the localhost API
  fetchMock.mock('begin:http://localhost:4000', adapter.getHandler());

  // Restore fetch behavior when the server is no longer needed
  return () => fetchMock.restore();
};
