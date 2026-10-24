import React from 'react';

import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';

import {
  DashboardOutlined,
  InventoryOutlined,
  CategoryOutlined,
  ShoppingCartOutlined,
  PeopleOutlined,
  PaymentOutlined,
  LocalOfferOutlined,
  RateReviewOutlined,
  SettingsOutlined,
} from '@mui/icons-material';

import {
  Link,
  useLocation,
} from 'react-router-dom';

const menu = [
  {
    label: 'Dashboard',
    path: '/admin',
    icon: <DashboardOutlined />,
  },
  {
    label: 'Produits',
    path: '/admin/products',
    icon: <InventoryOutlined />,  // Changed from Inventory2Outlined
  },
  {
    label: 'Catalogue CSV',
    path: '/admin/catalogue',
    icon: <InventoryOutlined />,  // Changed from Inventory2Outlined
  },
  {
    label: 'Catégories',
    path: '/admin/categories',
    icon: <CategoryOutlined />,
  },
  {
    label: 'Commandes',
    path: '/admin/orders',
    icon: <ShoppingCartOutlined />,
  },
  {
    label: 'Clients',
    path: '/admin/customers',
    icon: <PeopleOutlined />,
  },
  {
    label: 'Paiements',
    path: '/admin/payments',
    icon: <PaymentOutlined />,  // Changed from PaymentsOutlined
  },
  {
    label: 'Coupons',
    path: '/admin/coupons',
    icon: <LocalOfferOutlined />,
  },
  {
    label: 'Avis',
    path: '/admin/reviews',
    icon: <RateReviewOutlined />,
  },
  {
    label: 'Paramètres',
    path: '/admin/settings',
    icon: <SettingsOutlined />,
  },
];

function AdminSidebar() {
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 260,
        flexShrink: 0,
        display: {
          xs: 'none',
          md: 'block',
        },
        background: 'var(--pv-band)',
        color: '#fff',
        minHeight: '100vh',
        p: 2,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={900}
        sx={{ p: 2, mb: 2 }}
      >
        Pivot Store
      </Typography>

      <Divider
        sx={{
          borderColor:
            'rgba(255,255,255,0.1)',
          mb: 2,
        }}
      />

      <List>
        {menu.map(item => {
          const active =
            location.pathname === item.path;

          return (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: '#CBD5E1',
                transition: 'all 0.2s',
                '&:hover': {
                  background: 'rgba(124, 58, 237, 0.1)',
                  color: '#fff',
                },

                ...(active && {
                  background: '#7C3AED',
                  color: '#fff',
                  '&:hover': {
                    background: '#6D28D9',
                  },
                }),
              }}
            >
              <ListItemIcon
                sx={{
                  color: 'inherit',
                  minWidth: 40,
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.label}
          slotProps={{
            primary: {
                  fontWeight: active ? 600 : 400,
                },
          }}
        />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}

export default AdminSidebar;