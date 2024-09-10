import React from 'react';
import {
  List,
  DatagridConfigurable,
  TextField,
  ImageField,
  UrlField,
  EditButton,
  DeleteButton,
  ReferenceInput,
  FilterButton,
  ExportButton,
  TopToolbar,
  SelectColumnsButton,
  TextInput,
} from 'react-admin';

// Custom actions for filtering, selecting columns, and exporting
const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <SelectColumnsButton />
    <ExportButton />
  </TopToolbar>
);

// Define your filters as an array of input components
const contentFilters = [
  <TextInput source="q" label="Search" alwaysOn key="q" />,
  <ReferenceInput
    source="category"
    label="Category"
    reference="content"
    key="z"
  />,
];

// Main ManageContent component with search, filter, dynamic columns, sorting, and pagination
export const ManageContent: React.FC = () => {
  return (
    <List
      filters={contentFilters} // Pass the filters array here
      sort={{ field: 'name', order: 'ASC' }} // Default sort by name
      perPage={25} // Pagination, 25 records per page
      actions={<ListActions />} // Actions like filtering, column selection, export
    >
      <DatagridConfigurable>
        <TextField source="id" label="Content ID" />
        <TextField source="name" label="Content Name" />
        <TextField source="category" label="Category" />
        <TextField source="description" label="Description" />
        <UrlField source="videolink" label="Video Link" />
        <ImageField source="image" label="Thumbnail" />
        <EditButton />
        <DeleteButton />
      </DatagridConfigurable>
    </List>
  );
};
