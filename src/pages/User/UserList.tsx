import * as React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const UserList: React.FC = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="username" />
        <EmailField source="email" />
        <TextField source="role" />
      </Datagrid>
    </List>
  );
};
