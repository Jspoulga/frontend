import React from 'react';

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import AdminSidebar from '../admin/AdminSidebar';
import AdminHeader from '../admin/AdminHeader';

function DashboardLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',

        bgcolor: 'var(--pv-canvas)',
        color: 'var(--pv-ink)',

        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* =========================
          BACKGROUND DECORATIONS
      ========================== */}

      <Box
        sx={{
          position: 'fixed',
          width: {
            xs: 260,
            md: 380,
          },
          height: {
            xs: 260,
            md: 380,
          },
          borderRadius: '50%',

          top: -160,
          right: -150,

          background:
            'radial-gradient(circle, rgba(236,72,153,.055), transparent 70%)',

          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: 'fixed',
          width: {
            xs: 240,
            md: 330,
          },
          height: {
            xs: 240,
            md: 330,
          },
          borderRadius: '50%',

          bottom: -140,
          right: -120,

          background:
            'radial-gradient(circle, rgba(168,85,247,.045), transparent 70%)',

          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* =========================
          SIDEBAR
      ========================== */}

      <Box
        sx={{
          position: 'relative',
          zIndex: 1100,
          flexShrink: 0,
        }}
      >
        <AdminSidebar />
      </Box>

      {/* =========================
          MAIN APP AREA
      ========================== */}

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          minHeight: '100vh',

          display: 'flex',
          flexDirection: 'column',

          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* =========================
            ADMIN HEADER
        ========================== */}

        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,

            width: '100%',
          }}
        >
          <AdminHeader />
        </Box>

        {/* =========================
            MAIN CONTENT
        ========================== */}

        <Box
          component="main"
          sx={{
            position: 'relative',
            zIndex: 1,

            flex: 1,
            width: '100%',
            minWidth: 0,

            px: {
              xs: 1.5,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 5,
            },

            py: {
              xs: 2,
              sm: 2.5,
              md: 3.5,
              lg: 4,
              xl: 4.5,
            },

            pb: {
              xs: 4,
              sm: 4,
              md: 5,
            },

            animation:
              'dashboardContentEnter .45s ease both',

            overflowX: 'hidden',
          }}
        >
          <Outlet />
        </Box>

        {/* =========================
            SUBTLE FOOTER LINE
        ========================== */}

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,

            mx: {
              xs: 2,
              md: 4,
              xl: 5,
            },

            height: 1,

            background:
              'linear-gradient(90deg, transparent, rgba(0,0,0,.07), transparent)',
          }}
        />

        <Box
          sx={{
            position: 'relative',
            zIndex: 1,

            px: {
              xs: 2,
              md: 4,
              xl: 5,
            },

            py: 2,

            display: {
              xs: 'none',
              sm: 'flex',
            },

            alignItems: 'center',
            justifyContent: 'space-between',

            gap: 2,
          }}
        >
          <Box
            component="span"
            sx={{
              fontSize: '0.68rem',
              fontWeight: 650,
              color: 'var(--pv-muted)',
            }}
          >
            Pivot Store Admin
          </Box>

          <Box
            component="span"
            sx={{
              fontSize: '0.66rem',
              fontWeight: 600,
              color: 'var(--pv-muted)',
            }}
          >
            Gestion de votre boutique
          </Box>
        </Box>
      </Box>

      {/* =========================
          ANIMATIONS
      ========================== */}

      <style>
        {`
          @keyframes dashboardContentEnter {
            from {
              opacity: 0;
              transform: translateY(8px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
            }
          }
        `}
      </style>
    </Box>
  );
}

export default DashboardLayout;