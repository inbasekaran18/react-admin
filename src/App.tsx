import React, { useEffect } from 'react';
import { setupFakeServer } from './FakeData/mockServer.ts'; // Mock server setup
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UserList } from './pages/User/Profile.tsx'; // Import the UserList component

// Base URL for the mock server
const dataProvider = jsonServerProvider('http://localhost:4000');

const App: React.FC = () => {
  useEffect(() => {
    const restoreServer = setupFakeServer();
    return () => {
      restoreServer();
    };
  }, []);

  return (
    <Admin dataProvider={dataProvider}>
      {/* Resource for customers */}
      <Resource name="customers" list={UserList} />

      {/* Add more resources for orders and users */}
      <Resource name="orders" list={UserList} />
      <Resource name="users" list={UserList} />
    </Admin>
  );
};

export default App;
