import React from 'react';

import {
  Box,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Badge,
} from '@mui/material';

import {
  HomeOutlined,
  SearchOutlined,
  ShoppingBagOutlined,
  PersonOutlineOutlined,
} from '@mui/icons-material';

import {
  useLocation,
  useNavigate,
} from 'react-router-dom';

import { useSelector } from 'react-redux';

function MobileNavigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = useSelector(state =>
    state.cart.items.reduce(
      (total, item) => total + item.quantity,
      0
    )
  );

  const getValue = () => {
    if (location.pathname === '/') return 0;

    if (
      location.pathname.includes('search')
    ) {
      return 1;
    }

    if (
      location.pathname.includes('cart')
    ) {
      return 2;
    }

    if (
      location.pathname.includes('account')
    ) {
      return 3;
    }

    return 0;
  };

  const handleNavigation = (event, value) => {
    if (value === 0) navigate('/');
    if (value === 1) navigate('/search');
    if (value === 2) navigate('/cart');
    if (value === 3) navigate('/account/profile');
  };

  return (
    <Box
      sx={{
        display: {
          xs: 'block',
          md: 'none',
        },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1200,

        px: {
          xs: 1.5,
          sm: 2,
        },

        pb: {
          xs: 1.5,
          sm: 2,
        },

        pointerEvents: 'none',
      }}
    >
      <Paper
        elevation={0}
        sx={{
          pointerEvents: 'auto',

          maxWidth: 500,
          mx: 'auto',

          overflow: 'hidden',

          borderRadius: '22px',

          background: 'var(--pv-surface-blur)',

          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter:
            'blur(20px)',

          border: '1px solid var(--pv-line)',

          boxShadow: '0 10px 40px var(--pv-shadow)',

          '& .MuiBottomNavigation-root': {
            height: {
              xs: 68,
              sm: 72,
            },
            background: 'transparent',
          },
        }}
      >
        <BottomNavigation
          value={getValue()}
          onChange={handleNavigation}
          showLabels
        >
          {/* HOME */}
          <BottomNavigationAction
            label="Accueil"
            icon={
              <Box
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 42,
                  height: 30,
                  borderRadius: '12px',
                  transition: '0.25s',
                }}
              >
                <HomeOutlined
                  sx={{
                    fontSize: 23,
                  }}
                />
              </Box>
            }
            sx={{
              minWidth: 0,
              maxWidth: 'none',

              color: 'var(--pv-muted)',

              '&.Mui-selected': {
                color: '#C2185B',
              },

              '& .MuiBottomNavigationAction-label': {
                fontSize: 10,
                fontWeight: 600,
                mt: 0.4,
              },

              '&.Mui-selected .MuiBottomNavigationAction-label':
                {
                  fontSize: 10,
                },
            }}
          />

          {/* SEARCH */}
          <BottomNavigationAction
            label="Recherche"
            icon={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 42,
                  height: 30,
                  borderRadius: '12px',
                }}
              >
                <SearchOutlined
                  sx={{
                    fontSize: 23,
                  }}
                />
              </Box>
            }
            sx={{
              minWidth: 0,
              maxWidth: 'none',

              color: 'var(--pv-muted)',

              '&.Mui-selected': {
                color: '#C2185B',
              },

              '& .MuiBottomNavigationAction-label': {
                fontSize: 10,
                fontWeight: 600,
                mt: 0.4,
              },
            }}
          />

          {/* CART */}
          <BottomNavigationAction
            label="Panier"
            icon={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 42,
                  height: 30,
                  borderRadius: '12px',
                }}
              >
                <Badge
                  badgeContent={cartCount}
                  max={99}
                  sx={{
                    '& .MuiBadge-badge': {
                      background: '#C2185B',
                      color: '#fff',
                      fontSize: 9,
                      fontWeight: 700,
                      minWidth: 17,
                      height: 17,
                      padding: 0,
                      top: -2,
                      right: -5,
                      border:
                        '2px solid #fff',
                    },
                  }}
                >
                  <ShoppingBagOutlined
                    sx={{
                      fontSize: 23,
                    }}
                  />
                </Badge>
              </Box>
            }
            sx={{
              minWidth: 0,
              maxWidth: 'none',

              color: 'var(--pv-muted)',

              '&.Mui-selected': {
                color: '#C2185B',
              },

              '& .MuiBottomNavigationAction-label': {
                fontSize: 10,
                fontWeight: 600,
                mt: 0.4,
              },
            }}
          />

          {/* ACCOUNT */}
          <BottomNavigationAction
            label="Compte"
            icon={
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 42,
                  height: 30,
                  borderRadius: '12px',
                }}
              >
                <PersonOutlineOutlined
                  sx={{
                    fontSize: 23,
                  }}
                />
              </Box>
            }
            sx={{
              minWidth: 0,
              maxWidth: 'none',

              color: 'var(--pv-muted)',

              '&.Mui-selected': {
                color: '#C2185B',
              },

              '& .MuiBottomNavigationAction-label': {
                fontSize: 10,
                fontWeight: 600,
                mt: 0.4,
              },
            }}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}

export default MobileNavigation;