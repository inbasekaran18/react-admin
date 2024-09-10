import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const ManageContentCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="category" />
      <TextInput source="description" />
      <TextInput source="videolink" />
      <TextInput source="image" />
      {/* Add other fields as necessary */}
    </SimpleForm>
  </Create>
);
