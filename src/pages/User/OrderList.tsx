import * as React from 'react';
import { List, Datagrid, TextField, DateField, NumberField } from 'react-admin';

export const OrderList: React.FC = (props) => {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="customerId" />
        <DateField source="orderDate" />
        <NumberField source="totalAmount" />
        <TextField source="status" />
      </Datagrid>
    </List>
  );
};
