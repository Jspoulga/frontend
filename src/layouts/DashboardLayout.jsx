import React from 'react';

import {
  Box,
} from '@mui/material';

import {
  Outlet,
} from 'react-router-dom';

import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';


function DashboardLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: 'var(--pv-canvas)',
        color: 'var(--pv-ink)',
      }}
    >

      {/* =====================================================
          ADMIN SIDEBAR
      ====================================================== */}

      <AdminSidebar />


      {/* =====================================================
          MAIN AREA
      ====================================================== */}

      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >

        {/* ===================================================
            HEADER
        ==================================================== */}

        <Box
          sx={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
          }}
        >
          <AdminHeader />
        </Box>


        {/* ===================================================
            MAIN CONTENT
        ==================================================== */}

        <Box
          component="main"
          sx={{
            flex: 1,
            width: '100%',
            p: {
              xs: 2,
              sm: 2.5,
              md: 4,
              lg: 4.5,
              xl: 5,
            },

            /*
              Petit espace supplémentaire sur desktop
              pour donner plus d'air au dashboard.
            */
            pb: {
              xs: 4,
              md: 6,
            },

            animation:
              'dashboardEnter .45s ease both',

            /*
              Permet aux pages enfants de ne pas
              dépasser horizontalement.
            */
            overflowX: 'hidden',
          }}
        >

          <Outlet />

        </Box>


        {/* ===================================================
            BACKGROUND DECORATION
        ==================================================== */}

        <Box
          sx={{
            position: 'fixed',
            width: 380,
            height: 380,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(236,72,153,.045), transparent 70%)',
            right: -180,
            bottom: -180,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        <Box
          sx={{
            position: 'fixed',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(168,85,247,.035), transparent 70%)',
            left: '35%',
            top: 120,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

      </Box>


      {/* =====================================================
          ANIMATION
      ====================================================== */}

      <style>
        {`
          @keyframes dashboardEnter {
            from {
              opacity: 0;
              transform: translateY(8px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

    </Box>
  );
}

export default DashboardLayout;