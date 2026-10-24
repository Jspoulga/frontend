import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import {
  NotificationsOutlined,
} from '@mui/icons-material';

function AdminHeader() {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
      sx={{
        borderBottom: '1px solid var(--pv-line)',
      }}
    >
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          fontWeight={800}
        >
          Administration
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <IconButton
          aria-label="notifications"
          color="inherit"
        >
          <NotificationsOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default AdminHeader;