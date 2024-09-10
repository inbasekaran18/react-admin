import React, { useEffect } from 'react';
import { useStore, Admin, Resource, localStorageStore } from 'react-admin';
import authProvider from './providers/authProvider.ts';
import dataProvider from './providers/dataProvider.ts'; // Custom data provider with role-based access
//import { CustomerList } from './pages/User/Profile.tsx';
import { UserList } from './pages/User/UserList.tsx';
import { ManageContent } from './pages/Content/ManageContent.tsx';
import { ManageDevices } from './pages/Device/ManageDevice.tsx';
import { ManageSessions } from './pages/Session/MangeSession.tsx';

import { setupFakeServer } from './FakeData/mockServer.ts';

import LoginPage from './pages/Auth/Login.tsx';
//import CustomLayout from './components/layout.tsx';
import { themes, ThemeName } from './themes/themes.tsx';

//Menu Icons
import UserIcon from '@mui/icons-material/Group';
import ManageContentIcon from '@mui/icons-material/Description';
import SessionIcon from '@mui/icons-material/AccessTime';
import DeviceIcon from '@mui/icons-material/Devices';

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
          <>
            <Resource
              name="content"
              list={ManageContent}
              key="ManageContent"
              icon={ManageContentIcon}
            />
            <Resource
              name="users"
              list={UserList}
              key="users"
              icon={UserIcon}
            />
          </>
        ) : null,
        // (permissions === 'admin' || permissions === 'superadmin') && (
        //   <Resource
        //     name="customers"
        //     list={CustomerList}
        //     key="customers"
        //     icon={UserIcon}
        //   />
        // ),
        <>
          <Resource
            name="sessions"
            list={ManageSessions}
            key="orders"
            icon={SessionIcon}
          />
          <Resource
            name="devices"
            list={ManageDevices}
            key="orders"
            icon={DeviceIcon}
          />
        </>,
      ]}
    </Admin>
  );
};

export default App;
