import React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

export const ManageDevices = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="devicename" />
      <TextField source="type" />
      <TextField source="details" />
    </Datagrid>
  </List>
);
