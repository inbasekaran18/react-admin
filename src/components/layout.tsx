import * as React from 'react';
import { Layout } from 'react-admin';
import CustomAppBar from './CustomAppBar.tsx'; // Import the custom AppBar

const CustomLayout = (props) => <Layout {...props} appBar={CustomAppBar} />;

export default CustomLayout;
