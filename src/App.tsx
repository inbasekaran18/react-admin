import React, { useEffect } from 'react';
import { setupFakeServer } from './FakeData/mockServer';
import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { UserList } from './pages/User/Profile';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

const App: React.FC = () => {
  useEffect(() => {
    const restoreServer = setupFakeServer();
    return () => {
      restoreServer();
    };
  }, []);

  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} />
    </Admin>
  );
};

export default App;
