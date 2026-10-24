import React from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Header from '../components/layout/Header';
import PageTransition from '../components/common/PageTransition';
import ScrollToTop from '../components/common/ScrollToTop';
import Footer from '../components/layout/Footer';
import MobileNavigation from '../components/layout/MobileNavigation';

function MainLayout() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflowX: 'clip',
        bgcolor: 'var(--pv-surface-alt)',
        color: 'var(--pv-ink)',
      }}
    >
      {/* Background decoration */}
      <Box
        sx={{
          position: 'fixed',
          width: 420,
          height: 420,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(236,72,153,.055), transparent 70%)',
          top: 100,
          right: -220,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <Box
        sx={{
          position: 'fixed',
          width: 360,
          height: 360,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(168,85,247,.045), transparent 70%)',
          left: -220,
          top: '45%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Header — rendu directement : un parent en position relative qui
          defile empecherait le sticky de coller au haut de l'ecran. */}
      <Header />

      {/* Main content */}
      <Box
        component="main"
        sx={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          width: '100%',
          minWidth: 0,

          /*
           * MobileNavigation peut rester fixe en bas.
           * On garde donc suffisamment d'espace sur mobile.
           */
          pb: {
            xs: 9,
            sm: 2,
            md: 0,
          },

          animation: 'mainContentEnter .45s ease both',
        }}
      >
        <ScrollToTop />

        <PageTransition>
          <Outlet />
        </PageTransition>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Footer />
      </Box>

      {/* Mobile bottom navigation */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1100,
        }}
      >
        <MobileNavigation />
      </Box>

      {/* Animations */}
      <style>
        {`
          @keyframes mainContentEnter {
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

export default MainLayout;