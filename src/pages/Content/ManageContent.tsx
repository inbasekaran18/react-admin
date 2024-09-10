import React from 'react';
import { List, Datagrid, TextField, ImageField, UrlField } from 'react-admin';

export const ManageContent = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="category" />
      <TextField source="description" />
      <UrlField source="videolink" label="Video Link" />
      <ImageField source="image" label="Image" />
    </Datagrid>
  </List>
);
