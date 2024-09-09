import React, { useEffect } from 'react';
import { useStore, Admin, Resource, localStorageStore } from 'react-admin';
import authProvider from './providers/authProvider.ts';
import dataProvider from './providers/dataProvider.ts'; // Custom data provider with role-based access
import { CustomerList } from './pages/User/Profile.tsx';
import { OrderList } from './pages/User/OrderList.tsx';
import { UserList } from './pages/User/UserList.tsx';
import { setupFakeServer } from './FakeData/mockServer.ts';
import LoginPage from './pages/Auth/Login.tsx';
//import CustomLayout from './components/layout.tsx';
import { themes, ThemeName } from './themes/themes.tsx';
const store = localStorageStore(undefined, 'trnr');
const App: React.FC = () => {
  const [themeName] = useStore<ThemeName>('themeName', 'house');
  const lightTheme = themes.find((theme) => theme.name === themeName)?.light;
  const darkTheme = themes.find((theme) => theme.name === themeName)?.dark;
  useEffect(() => {
    const restoreServer = setupFakeServer();
    return () => {
      restoreServer();
    };
  }, []);

  return (
    <Admin
      authProvider={authProvider}
      dataProvider={dataProvider}
      loginPage={LoginPage}
      lightTheme={lightTheme}
      darkTheme={darkTheme}
      defaultTheme="light"
      store={store}
      //layout={CustomLayout}
    >
      {(permissions) => [
        permissions === 'superadmin' ? (
          <Resource name="users" list={UserList} key="users" />
        ) : null,
        (permissions === 'admin' || permissions === 'superadmin') && (
          <Resource name="customers" list={CustomerList} key="customers" />
        ),
        <Resource name="orders" list={OrderList} key="orders" />,
      ]}
    </Admin>
  );
};

export default App;
