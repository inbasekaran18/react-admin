import * as React from 'react';
import { AppBar, TitlePortal } from 'react-admin';
import { Typography, Box } from '@mui/material';

const CustomAppBar = (props) => (
  <AppBar {...props}>
    <TitlePortal>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <img
          src="https://via.placeholder.com/50x50.png?text=T"
          alt="Logo"
          style={{ height: 40, marginRight: 10 }}
        />
        <Typography variant="h6">trnr</Typography>
      </Box>
    </TitlePortal>
  </AppBar>
);

export default CustomAppBar;
