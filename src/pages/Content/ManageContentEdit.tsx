import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

export const ManageContentEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="name" />
      <TextInput source="category" />
      <TextInput source="description" />
      <TextInput source="videolink" />
      <TextInput source="image" />
      {/* Add other fields as necessary */}
    </SimpleForm>
  </Edit>
);
