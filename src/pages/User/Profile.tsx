import * as React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const UserList: React.FC = (props) => (
  <List {...props}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="username" />
      <EmailField source="email" />
    </Datagrid>
  </List>
);
