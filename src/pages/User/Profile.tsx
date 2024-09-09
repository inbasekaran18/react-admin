import * as React from 'react';
import { List, Datagrid, TextField, EmailField } from 'react-admin';

export const CustomerList: React.FC = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <EmailField source="email" />
        <TextField source="address" />
        <TextField source="city" />
        <TextField source="zipcode" />
        <TextField source="country" />
      </Datagrid>
    </List>
  );
};
