import React, { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';

import AdminPanelSettingsOutlined from '@mui/icons-material/AdminPanelSettingsOutlined';
import FavoriteBorderRounded from '@mui/icons-material/FavoriteBorderRounded';
import LogoutRounded from '@mui/icons-material/LogoutRounded';
import PersonOutlineOutlined from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlined from '@mui/icons-material/SettingsOutlined';
import ShoppingBagOutlined from '@mui/icons-material/ShoppingBagOutlined';

import authService from '../../services/authService';
import useTranslation from '../../hooks/useTranslation';
import { logout } from '../../store/slices/authSlice';

const ACCENT = '#be185d';

function initialsOf(name) {
  const parts = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  return parts.length
    ? parts.map(part => part.charAt(0).toUpperCase()).join('')
    : 'K';
}

/*
 * Bouton compte de l'en-tête : menu déroulant une fois connecté, avec la
 * déconnexion — qui manquait complètement jusqu'ici.
 */
function AccountMenu({ iconButtonStyles }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [anchor, setAnchor] = useState(null);

  const user = useSelector(state => state.auth.user);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const close = () => setAnchor(null);

  const handleLogout = async () => {
    close();

    /* On vide la session locale même si l'API ne répond pas. */
    await authService.logout();
    dispatch(logout());

    navigate('/', { replace: true });
  };

  const items = [
    { to: '/account/profile', label: t('account.profile'), Icon: PersonOutlineOutlined },
    { to: '/orders', label: t('account.orders'), Icon: ShoppingBagOutlined },
    { to: '/wishlist', label: t('account.wishlist'), Icon: FavoriteBorderRounded },
    { to: '/account/settings', label: t('account.settings'), Icon: SettingsOutlined },
  ];

  if (user?.role === 'admin') {
    items.push({
      to: '/admin',
      label: t('account.admin'),
      Icon: AdminPanelSettingsOutlined,
    });
  }

  if (!isAuthenticated) {
    return (
      <Tooltip title={t('account.login')}>
        <IconButton
          component={Link}
          to="/login"
          aria-label={t('account.login')}
          sx={iconButtonStyles}
        >
          <PersonOutlineOutlined sx={{ fontSize: 22 }} />
        </IconButton>
      </Tooltip>
    );
  }

  return (
    <>
      <Tooltip title={t('account.account')}>
        <IconButton
          onClick={event => setAnchor(event.currentTarget)}
          aria-label={t('account.account')}
          aria-haspopup="true"
          aria-expanded={Boolean(anchor)}
          sx={{ ...iconButtonStyles, p: 0.6 }}
        >
          <Avatar
            sx={{
              width: 30,
              height: 30,
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#fff',
              background: 'linear-gradient(135deg, #ec4899 0%, #a855f7 100%)',
            }}
          >
            {initialsOf(user?.name)}
          </Avatar>
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchor}
        open={Boolean(anchor)}
        onClose={close}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1.2,
              minWidth: 240,
              borderRadius: '16px',
              border: '1px solid var(--pv-line)',
              boxShadow: '0 20px 50px rgba(17,16,22,0.12)',
              overflow: 'hidden',
              /* Ouverture en fondu + léger déplacement. */
              animation: 'accountMenuIn .18s ease-out',
              '@keyframes accountMenuIn': {
                from: { opacity: 0, transform: 'translateY(-6px)' },
                to: { opacity: 1, transform: 'translateY(0)' },
              },
            },
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography
            sx={{
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'var(--pv-ink)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {user?.name}
          </Typography>

          <Typography
            sx={{
              fontSize: '0.72rem',
              color: 'var(--pv-muted)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {user?.email}
          </Typography>
        </Box>

        <Divider />

        {items.map(({ to, label, Icon }) => (
          <MenuItem
            key={to}
            component={Link}
            to={to}
            onClick={close}
            sx={{
              py: 1.1,
              fontSize: '0.85rem',
              '&:hover': { bgcolor: 'var(--pv-accent-soft)', color: ACCENT },
              '&:hover .MuiListItemIcon-root': { color: ACCENT },
            }}
          >
            <ListItemIcon sx={{ minWidth: 34, color: 'var(--pv-body)' }}>
              <Icon sx={{ fontSize: 19 }} />
            </ListItemIcon>

            {label}
          </MenuItem>
        ))}

        <Divider />

        <Box sx={{ p: 1 }}>
          <Button
            fullWidth
            onClick={handleLogout}
            startIcon={<LogoutRounded sx={{ fontSize: '18px !important' }} />}
            sx={{
              justifyContent: 'flex-start',
              px: 1.5,
              minHeight: 42,
              borderRadius: '11px',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
              color: 'var(--pv-error)',
              '&:hover': { bgcolor: 'var(--pv-error-soft)' },
            }}
          >
            {t('account.logout')}
          </Button>
        </Box>
      </Menu>
    </>
  );
}

export default AccountMenu;
