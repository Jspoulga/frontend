import React from 'react';

import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Divider,
  Badge,
} from '@mui/material';

import {
  HomeOutlined,
  StorefrontOutlined,
  FavoriteBorderOutlined,
  ShoppingBagOutlined,
  Close,
  ChevronRight,
} from '@mui/icons-material';

import {
  Link,
  useLocation,
} from 'react-router-dom';

import { useSelector } from 'react-redux';

function Sidebar({
  open,
  onClose,
}) {
  const location = useLocation();

  const cartCount = useSelector(state =>
    state.cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  const menuItems = [
    {
      label: 'Accueil',
      path: '/',
      icon: <HomeOutlined />,
    },
    {
      label: 'Boutique',
      path: '/shop',
      icon: <StorefrontOutlined />,
    },
    {
      label: 'Favoris',
      path: '/wishlist',
      icon: <FavoriteBorderOutlined />,
    },
    {
      label: 'Panier',
      path: '/cart',
      icon: <ShoppingBagOutlined />,
      badge: cartCount,
    },
  ];

  const isActive = path => {
    if (path === '/') {
      return location.pathname === '/';
    }

    return location.pathname.startsWith(path);
  };

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
          slotProps={{
            paper: {
        sx: {
          width: {
            xs: '82%',
            sm: 330,
          },

          maxWidth: 360,

          background: 'var(--pv-surface)',

          borderRadius: '0 24px 24px 0',

          overflow: 'hidden',
        },
      },
          }}
        >
      {/* HEADER */}
      <Box
        sx={{
          height: 82,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--pv-line)',
        }}
      >
        {/* LOGO */}
        <Box
          component={Link}
          to="/"
          onClick={onClose}
          sx={{
            display: 'flex',
            textDecoration: 'none',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: '-1.5px',
              color: 'var(--pv-ink)',
              lineHeight: 1,
            }}
          >
            Pivot
          </Typography>

          <Typography
            sx={{
              fontSize: 28,
              fontWeight: 900,
              letterSpacing: '-1.5px',
              color: '#C2185B',
              lineHeight: 1,
            }}
          >
            Store
          </Typography>
        </Box>

        {/* CLOSE */}
        <IconButton
          onClick={onClose}
          sx={{
            width: 40,
            height: 40,
            background: '#F6F6F6',
            color: 'var(--pv-ink)',

            '&:hover': {
              background: 'var(--pv-line)',
            },
          }}
        >
          <Close fontSize="small" />
        </IconButton>
      </Box>

      {/* WELCOME */}
      <Box
        sx={{
          px: 3,
          pt: 4,
          pb: 2,
        }}
      >
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--pv-muted)',
            textTransform: 'uppercase',
            letterSpacing: 1.2,
            mb: 0.7,
          }}
        >
          Navigation
        </Typography>

        <Typography
          sx={{
            fontSize: 23,
            fontWeight: 800,
            color: 'var(--pv-ink)',
            letterSpacing: '-0.5px',
          }}
        >
          Découvrez Pivot Store
        </Typography>
      </Box>

      {/* MENU */}
      <List
        sx={{
          px: 2,
          py: 1,
        }}
      >
        {menuItems.map(item => {
          const active = isActive(item.path);

          return (
            <Box
              key={item.label}
              sx={{
                mb: 0.8,
              }}
            >
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={onClose}
                sx={{
                  minHeight: 58,
                  px: 2,
                  borderRadius: '14px',

                  background: active
                    ? 'rgba(194, 24, 91, 0.08)'
                    : 'transparent',

                  transition:
                    'all 0.2s ease',

                  '&:hover': {
                    background:
                      'rgba(194, 24, 91, 0.07)',
                  },
                }}
              >
                {/* ICON */}
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '12px',

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',

                    mr: 1.7,

                    background: active
                      ? '#C2185B'
                      : '#F6F6F6',

                    color: active
                      ? '#FFFFFF'
                      : 'var(--pv-body)',

                    transition:
                      'all 0.2s ease',
                  }}
                >
                  {item.badge !== undefined ? (
                    <Badge
                      badgeContent={item.badge}
                      max={99}
                      sx={{
                        '& .MuiBadge-badge': {
                          background: '#C2185B',
                          color: '#fff',
                          fontSize: 9,
                          fontWeight: 700,
                          minWidth: 17,
                          height: 17,
                          border:
                            '2px solid #fff',
                        },
                      }}
                    >
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </Box>

                {/* LABEL */}
                <ListItemText
                  primary={item.label}
          slotProps={{
            primary: {
                    fontSize: 14,
                    fontWeight: active
                      ? 700
                      : 500,
                    color: active
                      ? '#C2185B'
                      : 'var(--pv-ink)',
                  },
          }}
        />

                {/* ARROW */}
                <ChevronRight
                  sx={{
                    fontSize: 19,
                    color: active
                      ? '#C2185B'
                      : '#BBBBBB',
                  }}
                />
              </ListItemButton>
            </Box>
          );
        })}
      </List>

      <Divider
        sx={{
          mx: 3,
          my: 2,
          borderColor: 'var(--pv-line)',
        }}
      />

      {/* PROMO CARD */}
      <Box
        sx={{
          mx: 3,
          mt: 1,
          p: 2.5,
          borderRadius: '18px',

          background:
            'linear-gradient(135deg, #111111, #252525)',

          color: '#fff',
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            color: '#C2185B',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: 1,
            mb: 0.7,
          }}
        >
          Pivot Store
        </Typography>

        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 800,
            lineHeight: 1.2,
            mb: 1,
          }}
        >
          Votre style.
          <br />
          Votre identité.
        </Typography>

        <Typography
          sx={{
            fontSize: 12,
            color: 'var(--pv-muted)',
            lineHeight: 1.5,
          }}
        >
          Découvrez nos dernières
          collections.
        </Typography>
      </Box>

      {/* FOOTER */}
      <Box
        sx={{
          mt: 'auto',
          px: 3,
          py: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            color: 'var(--pv-muted)',
            textAlign: 'center',
          }}
        >
          © {new Date().getFullYear()} Pivot Store
        </Typography>
      </Box>
    </Drawer>
  );
}

export default Sidebar;