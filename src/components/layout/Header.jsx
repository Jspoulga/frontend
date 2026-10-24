import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import {
  ArrowForwardRounded,
  CloseRounded,
  FavoriteBorderOutlined,
  KeyboardArrowDownRounded,
  LocalShippingOutlined,
  MenuRounded,
  PersonOutlineOutlined,
  LogoutRounded,
  SearchRounded,
  ShoppingBagOutlined,
  VerifiedOutlined,
} from '@mui/icons-material';

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from 'framer-motion';

import { CATEGORIES } from '../../utils/constants';
import AccountMenu from './AccountMenu';
import useTranslation from '../../hooks/useTranslation';
import { logout } from '../../store/slices/authSlice';
import authService from '../../services/authService';
import PivotLogo from '../brand/PivotLogo';
import ThemeToggle from '../common/ThemeToggle';

/* -------------------------------------------------------------------------
   Tokens du header — alignés sur l'accent utilisé dans le reste du site.
-------------------------------------------------------------------------- */

/*
 * Les teintes de l'en-tête passent par les variables CSS du thème :
 * la barre bascule en sombre sans qu'aucun des usages ci-dessous ne
 * change, y compris ceux composés en chaîne (bordures, dégradés).
 */
const H = {
  ink: 'var(--pv-ink)',
  body: 'var(--pv-body)',
  muted: 'var(--pv-muted)',
  line: 'var(--pv-line)',
  surface: 'var(--pv-surface)',
  surfaceAlt: 'var(--pv-surface-alt)',
  accent: 'var(--pv-accent)',
  accentDeep: 'var(--pv-accent-deep)',
};

/* Hauteur de la barre principale : elle se compacte au défilement. */
const BAR_HEIGHT = { xs: 62, md: 76 };
const BAR_HEIGHT_COMPACT = { xs: 56, md: 62 };

const ANNOUNCEMENTS = [
  {
    icon: LocalShippingOutlined,
    text: 'Livraison offerte à Kinshasa dès 100 $ d’achat',
  },
  {
    icon: VerifiedOutlined,
    text: 'Paiement sécurisé — M-Pesa, Airtel Money, Orange Money',
  },
  {
    icon: ShoppingBagOutlined,
    text: 'Retour gratuit sous 14 jours sur toute la collection',
  },
];

const NAV_ITEMS = [
  { key: 'nav.home', label: 'Accueil', path: '/' },
  { key: 'nav.shop', label: 'Boutique', path: '/shop', mega: true },
  { key: 'nav.men', label: 'Hommes', path: '/category/Hommes' },
  { key: 'nav.women', label: 'Femmes', path: '/category/Femmes' },
];

const ANNOUNCEMENT_INTERVAL = 5000;
const MEGA_CLOSE_DELAY = 140;

function Header() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const prefersReducedMotion = useReducedMotion();

  const [search, setSearch] = useState('');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [announcement, setAnnouncement] = useState(0);

  const megaTimer = useRef(null);

  const cartCount = useSelector(state =>
    (state.cart.items || []).reduce(
      (total, item) => total + item.quantity,
      0,
    ),
  );

  const isAuthenticated = useSelector(
    state => state.auth.isAuthenticated,
  );

  /* ---------------------------------------------------------------------
     Défilement : état compact + barre de progression de lecture.
  ---------------------------------------------------------------------- */

  const { scrollY, scrollYProgress } = useScroll();

  const progress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  useMotionValueEvent(scrollY, 'change', value => {
    setScrolled(previous => {
      /* Hystérésis : évite que la barre clignote autour du seuil. */
      if (previous && value < 8) return false;
      if (!previous && value > 24) return true;
      return previous;
    });
  });

  /* ---------------------------------------------------------------------
     Bandeau d'annonces rotatif.
  ---------------------------------------------------------------------- */

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const id = setInterval(() => {
      setAnnouncement(index => (index + 1) % ANNOUNCEMENTS.length);
    }, ANNOUNCEMENT_INTERVAL);

    return () => clearInterval(id);
  }, [prefersReducedMotion]);

  /* ---------------------------------------------------------------------
     Menu déroulant "Boutique".
  ---------------------------------------------------------------------- */

  const openMega = useCallback(() => {
    clearTimeout(megaTimer.current);
    setMegaOpen(true);
  }, []);

  const closeMega = useCallback((immediate = false) => {
    clearTimeout(megaTimer.current);

    if (immediate) {
      setMegaOpen(false);
      return;
    }

    megaTimer.current = setTimeout(
      () => setMegaOpen(false),
      MEGA_CLOSE_DELAY,
    );
  }, []);

  useEffect(() => () => clearTimeout(megaTimer.current), []);

  /* On ferme tout à chaque navigation, sinon le menu reste ouvert. */
  useEffect(() => {
    closeMega(true);
    setMobileMenu(false);
  }, [location.pathname, location.search, closeMega]);

  useEffect(() => {
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        closeMega(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeMega]);

  /* ---------------------------------------------------------------------
     Recherche.
  ---------------------------------------------------------------------- */

  const submitSearch = event => {
    event.preventDefault();

    const query = search.trim();

    if (!query) {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(query)}`);
    setMobileMenu(false);
  };

  const isActive = path => {
    if (path === '/') {
      return location.pathname === '/';
    }

    return location.pathname.startsWith(path);
  };

  const accountPath = isAuthenticated ? '/account/profile' : '/login';

  const handleLogout = async () => {
    setMobileMenu(false);

    await authService.logout();
    dispatch(logout());

    navigate('/', { replace: true });
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        component="header"
        sx={{
          top: 0,
          zIndex: theme => theme.zIndex.appBar,
          color: H.ink,
          bgcolor: 'var(--pv-surface-blur)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderBottom: `1px solid ${scrolled ? H.line : 'transparent'}`,
          boxShadow: scrolled
            ? '0 6px 24px var(--pv-shadow)'
            : 'none',
          transition: 'box-shadow .3s ease, border-color .3s ease',
        }}
      >
        {/* ---------------------------------------------------------------
            Bandeau d'annonces — se replie dès que l'on défile.
        ---------------------------------------------------------------- */}

        <Box
          component={motion.div}
          initial={false}
          animate={{ height: scrolled ? 0 : 36, opacity: scrolled ? 0 : 1 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.32,
            ease: [0.22, 1, 0.36, 1],
          }}
          sx={{
            overflow: 'hidden',
            bgcolor: 'var(--pv-band)',
            color: 'var(--pv-band-ink)',
          }}
        >
          <Container maxWidth="xl" sx={{ height: 36 }}>
            <Box
              sx={{
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <Box
                  key={announcement}
                  component={motion.div}
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.28 }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  {React.createElement(ANNOUNCEMENTS[announcement].icon, {
                    sx: { fontSize: 16, color: H.accent },
                  })}

                  <Typography
                    sx={{
                      fontSize: { xs: '0.68rem', md: '0.74rem' },
                      fontWeight: 500,
                      letterSpacing: '0.02em',
                      textAlign: 'center',
                    }}
                  >
                    {ANNOUNCEMENTS[announcement].text}
                  </Typography>
                </Box>
              </AnimatePresence>
            </Box>
          </Container>
        </Box>

        {/* ---------------------------------------------------------------
            Barre principale
        ---------------------------------------------------------------- */}

        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              gap: { xs: 0.5, md: 1 },
              height: scrolled ? BAR_HEIGHT_COMPACT : BAR_HEIGHT,
              minHeight: scrolled ? BAR_HEIGHT_COMPACT : BAR_HEIGHT,
              transition: 'height .3s cubic-bezier(.22,1,.36,1), min-height .3s cubic-bezier(.22,1,.36,1)',
            }}
          >
            <IconButton
              onClick={() => setMobileMenu(true)}
              aria-label="Ouvrir le menu"
              sx={{
                display: { xs: 'inline-flex', md: 'none' },
                mr: 0.5,
                color: H.ink,
              }}
            >
              <MenuRounded />
            </IconButton>

            {/* LOGO */}
            <Box
              component={Link}
              to="/"
              aria-label="Pivot Store, retour à l'accueil"
              sx={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                mr: { xs: 0, md: 5 },
                transition: 'opacity .2s ease',
                '&:hover': { opacity: 0.75 },
              }}
            >
              <PivotLogo size={scrolled ? 30 : 34} />
            </Box>

            {/* NAVIGATION DESKTOP */}
            <Box
              component="nav"
              aria-label="Navigation principale"
              onMouseLeave={() => closeMega()}
              sx={{
                display: { xs: 'none', md: 'flex' },
                alignItems: 'center',
                gap: 0.5,
                height: '100%',
              }}
            >
              {NAV_ITEMS.map(item => (
                <NavLink
                  key={item.label}
                  item={{ ...item, label: t(item.key) }}
                  active={isActive(item.path)}
                  megaOpen={megaOpen}
                  onOpenMega={openMega}
                  onCloseMega={closeMega}
                  reducedMotion={prefersReducedMotion}
                />
              ))}
            </Box>

            <Box sx={{ flex: 1 }} />

            {/* RECHERCHE */}
            <Box
              component="form"
              role="search"
              onSubmit={submitSearch}
              sx={{
                display: { xs: 'none', lg: 'flex' },
                alignItems: 'center',
                height: 42,
                px: 1.5,
                mr: 1,
                width: 230,
                bgcolor: H.surfaceAlt,
                borderRadius: '999px',
                border: '1px solid transparent',
                transition: 'width .3s cubic-bezier(.22,1,.36,1), background-color .2s ease, border-color .2s ease',

                '&:focus-within': {
                  width: 320,
                  bgcolor: H.surface,
                  borderColor: 'rgba(236, 72, 153, 0.35)',
                  boxShadow: '0 0 0 4px rgba(236, 72, 153, 0.08)',
                },
              }}
            >
              <SearchRounded sx={{ fontSize: 20, color: H.muted }} />

              <InputBase
                value={search}
                onChange={event => setSearch(event.target.value)}
                placeholder={t('nav.search')}
               
                sx={{
                  ml: 1,
                  flex: 1,
                  fontSize: '0.82rem',
                  '& input::placeholder': { color: H.muted, opacity: 1 },
                }}
          slotProps={{
            input: { 'aria-label': 'Rechercher un produit' },
          }}
        />
            </Box>

            {/* ACTIONS — la déconnexion vit dans le menu compte. */}

            <ThemeToggle color={H.ink} />

            <Tooltip title="Mes favoris">
              <IconButton
                component={Link}
                to="/wishlist"
                aria-label="Mes favoris"
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  ...iconButtonStyles,
                }}
              >
                <FavoriteBorderOutlined sx={{ fontSize: 21 }} />
              </IconButton>
            </Tooltip>

            <AccountMenu iconButtonStyles={iconButtonStyles} />

            <Tooltip title="Mon panier">
              <IconButton
                component={Link}
                to="/cart"
                aria-label={`Mon panier, ${cartCount} article${cartCount > 1 ? 's' : ''}`}
                sx={iconButtonStyles}
              >
                <Badge
                  badgeContent={cartCount}
                  max={99}
                  sx={{
                    '& .MuiBadge-badge': {
                      bgcolor: H.accent,
                      color: '#fff',
                      fontSize: 10,
                      fontWeight: 700,
                      minWidth: 18,
                      height: 18,
                      padding: '0 4px',
                      top: 2,
                      right: 1,
                      animation: cartCount
                        ? 'cartPop .3s cubic-bezier(.22,1,.36,1)'
                        : 'none',
                    },
                  }}
                >
                  <ShoppingBagOutlined sx={{ fontSize: 22 }} />
                </Badge>
              </IconButton>
            </Tooltip>
          </Toolbar>
        </Container>

        {/* MENU DÉROULANT PLEINE LARGEUR */}
        <AnimatePresence>
          {megaOpen && (
            <MegaMenu
              onMouseEnter={openMega}
              onMouseLeave={() => closeMega()}
              reducedMotion={prefersReducedMotion}
            />
          )}
        </AnimatePresence>

        {/* PROGRESSION DE LECTURE */}
        <Box
          component={motion.div}
          style={{ scaleX: progress }}
          sx={{
            transformOrigin: '0% 50%',
            height: 2,
            background: `linear-gradient(90deg, ${H.accent}, #a855f7)`,
          }}
        />
      </AppBar>

      {/* -----------------------------------------------------------------
          MENU MOBILE
      ------------------------------------------------------------------ */}

      <Drawer
        anchor="left"
        open={mobileMenu}
        onClose={() => setMobileMenu(false)}
        slotProps={{
          paper: {
            sx: {
              width: 300,
              maxWidth: '85vw',
              borderRadius: '0 22px 22px 0',
            },
          },
        }}
      >
        <Box
          sx={{
            height: 72,
            px: 2.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: `1px solid ${H.line}`,
          }}
        >
          <Box
            component={Link}
            to="/"
            onClick={() => setMobileMenu(false)}
            sx={{ display: 'flex', textDecoration: 'none' }}
          >
            <Typography
              component="span"
              sx={{ fontSize: 22, fontWeight: 800, color: H.ink, letterSpacing: '-0.04em' }}
            >
              Pivot
            </Typography>

            <Typography
              component="span"
              sx={{ fontSize: 22, fontWeight: 800, color: H.accentDeep, letterSpacing: '-0.04em' }}
            >
              Store
            </Typography>
          </Box>

          <IconButton
            onClick={() => setMobileMenu(false)}
            aria-label="Fermer le menu"
          >
            <CloseRounded />
          </IconButton>
        </Box>

        <Box
          component="form"
          role="search"
          onSubmit={submitSearch}
          sx={{
            mx: 2,
            mt: 2.5,
            mb: 1.5,
            height: 46,
            px: 1.5,
            display: 'flex',
            alignItems: 'center',
            bgcolor: H.surfaceAlt,
            borderRadius: '999px',
          }}
        >
          <SearchRounded sx={{ fontSize: 20, color: H.muted }} />

          <InputBase
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Rechercher…"
           
            sx={{ ml: 1, flex: 1, fontSize: '0.85rem' }}
          slotProps={{
            input: { 'aria-label': 'Rechercher un produit' },
          }}
        />
        </Box>

        <MobileSection title="Navigation" />

        <List sx={{ px: 1.5, pt: 0 }}>
          {NAV_ITEMS.map((item, index) => (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.04 * index,
                  duration: 0.25,
                }}
                sx={{ width: '100%' }}
              >
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={() => setMobileMenu(false)}
                  sx={mobileItemStyles(isActive(item.path))}
                >
                  <ListItemText
                    primary={item.label}
                    slotProps={{
                      primary: {
                        sx: {
                          fontSize: '0.92rem',
                          fontWeight: isActive(item.path) ? 700 : 500,
                          color: isActive(item.path) ? H.accentDeep : H.ink,
                        },
                      },
                    }}
                  />
                </ListItemButton>
              </Box>
            </ListItem>
          ))}
        </List>

        <MobileSection title="Catégories" />

        <List sx={{ px: 1.5, pt: 0 }}>
          {CATEGORIES.map((category, index) => (
            <ListItem key={category} disablePadding sx={{ mb: 0.5 }}>
              <Box
                component={motion.div}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: prefersReducedMotion ? 0 : 0.16 + 0.04 * index,
                  duration: 0.25,
                }}
                sx={{ width: '100%' }}
              >
                <ListItemButton
                  component={Link}
                  to={`/category/${category}`}
                  onClick={() => setMobileMenu(false)}
                  sx={mobileItemStyles(
                    location.pathname === `/category/${category}`,
                  )}
                >
                  <ListItemText
                    primary={category}
                    slotProps={{
                      primary: {
                        sx: { fontSize: '0.88rem', color: H.body },
                      },
                    }}
                  />

                  <ArrowForwardRounded
                    sx={{ fontSize: 16, color: H.muted }}
                  />
                </ListItemButton>
              </Box>
            </ListItem>
          ))}
        </List>

        <Divider sx={{ mx: 2, my: 1 }} />

        <List sx={{ px: 1.5, pb: 3 }}>
          <ListItem disablePadding sx={{ mb: 0.5 }}>
            <ListItemButton
              component={Link}
              to={accountPath}
              onClick={() => setMobileMenu(false)}
              sx={mobileItemStyles(false)}
            >
              <PersonOutlineOutlined sx={{ mr: 1.5, fontSize: 20, color: H.body }} />

              <ListItemText
                primary={
                  isAuthenticated ? t('account.account') : t('account.login')
                }
                slotProps={{ primary: { sx: { fontSize: '0.88rem' } } }}
              />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/cart"
              onClick={() => setMobileMenu(false)}
              sx={mobileItemStyles(false)}
            >
              <ShoppingBagOutlined sx={{ mr: 1.5, fontSize: 20, color: H.body }} />

              <ListItemText
                primary={cartCount ? `Mon panier (${cartCount})` : 'Mon panier'}
                slotProps={{ primary: { sx: { fontSize: '0.88rem' } } }}
              />
            </ListItemButton>
          </ListItem>

          {isAuthenticated && (
            <ListItem disablePadding sx={{ mt: 0.5 }}>
              <ListItemButton
                onClick={handleLogout}
                sx={mobileItemStyles(false)}
              >
                <LogoutRounded sx={{ mr: 1.5, fontSize: 20, color: H.body }} />
                <ListItemText
                  primary={t('account.logout')}
                  slotProps={{ primary: { sx: { fontSize: '0.88rem' } } }}
                />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Drawer>

      <style>
        {`
          @keyframes cartPop {
            0%   { transform: scale(0.4); }
            60%  { transform: scale(1.15); }
            100% { transform: scale(1); }
          }

          @media (prefers-reduced-motion: reduce) {
            .MuiBadge-badge { animation: none !important; }
          }
        `}
      </style>
    </>
  );
}

/* -------------------------------------------------------------------------
   Lien de navigation : soulignement animé, et déclencheur du méga-menu.
-------------------------------------------------------------------------- */

function NavLink({
  item,
  active,
  megaOpen,
  onOpenMega,
  onCloseMega,
  reducedMotion,
}) {
  const expanded = Boolean(item.mega) && megaOpen;

  return (
    <Button
      component={Link}
      to={item.path}
      onMouseEnter={() => (item.mega ? onOpenMega() : onCloseMega())}
      onFocus={() => (item.mega ? onOpenMega() : onCloseMega(true))}
      aria-haspopup={item.mega ? 'true' : undefined}
      aria-expanded={item.mega ? expanded : undefined}
      endIcon={
        item.mega ? (
          <KeyboardArrowDownRounded
            sx={{
              fontSize: '18px !important',
              transition: reducedMotion ? 'none' : 'transform .25s ease',
              transform: expanded ? 'rotate(180deg)' : 'none',
            }}
          />
        ) : null
      }
      sx={{
        position: 'relative',
        px: 1.75,
        py: 1,
        minWidth: 0,
        textTransform: 'none',
        fontSize: '0.88rem',
        fontWeight: active ? 700 : 500,
        color: active ? H.ink : H.body,
        borderRadius: '10px',

        '&:hover': { bgcolor: 'transparent', color: H.ink },

        '&::after': {
          content: '""',
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: 6,
          height: 2,
          borderRadius: 2,
          background: H.accent,
          transformOrigin: 'center',
          transform: active || expanded ? 'scaleX(1)' : 'scaleX(0)',
          transition: 'transform .28s cubic-bezier(.22,1,.36,1)',
        },

        '&:hover::after': { transform: 'scaleX(1)' },
      }}
    >
      {item.label}
    </Button>
  );
}

/* -------------------------------------------------------------------------
   Méga-menu "Boutique".
-------------------------------------------------------------------------- */

function MegaMenu({ onMouseEnter, onMouseLeave, reducedMotion }) {
  return (
    <Box
      component={motion.div}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reducedMotion ? 0 : -10 }}
      transition={{ duration: reducedMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
      sx={{
        /* En superposition : sinon l'ouverture pousse toute la page vers le bas. */
        position: 'absolute',
        top: '100%',
        left: 0,
        right: 0,
        display: { xs: 'none', md: 'block' },
        borderTop: `1px solid ${H.line}`,
        bgcolor: H.surface,
        boxShadow: '0 24px 48px rgba(17, 16, 22, 0.10)',
      }}
    >
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box
          sx={{
            display: 'grid',
            gap: 4,
            gridTemplateColumns: 'minmax(0, 2fr) minmax(240px, 1fr)',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: '0.68rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: H.muted,
                mb: 2,
              }}
            >
              Toutes les catégories
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gap: 1,
                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              }}
            >
              {CATEGORIES.map((category, index) => (
                <Box
                  key={category}
                  component={motion.div}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: reducedMotion ? 0 : 0.03 * index,
                    duration: 0.22,
                  }}
                >
                  <Button
                    component={Link}
                    to={`/category/${category}`}
                    fullWidth
                    endIcon={<ArrowForwardRounded sx={{ fontSize: '16px !important' }} />}
                    sx={{
                      justifyContent: 'space-between',
                      textTransform: 'none',
                      textAlign: 'left',
                      px: 1.5,
                      py: 1.25,
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: 600,
                      color: H.ink,

                      '& .MuiButton-endIcon': {
                        opacity: 0,
                        transform: 'translateX(-6px)',
                        transition: 'opacity .2s ease, transform .2s ease',
                      },

                      '&:hover': {
                        bgcolor: 'var(--pv-accent-soft)',
                        color: H.accentDeep,
                      },

                      '&:hover .MuiButton-endIcon': {
                        opacity: 1,
                        transform: 'translateX(0)',
                      },
                    }}
                  >
                    {category}
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Encart promotionnel */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, scale: reducedMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reducedMotion ? 0 : 0.28 }}
            sx={{
              position: 'relative',
              overflow: 'hidden',
              p: 3,
              borderRadius: '18px',
              color: '#fff',
              background: 'linear-gradient(135deg, #141018 0%, #2a1526 100%)',
            }}
          >
            <Box
              aria-hidden
              sx={{
                position: 'absolute',
                width: 220,
                height: 220,
                right: -110,
                top: -120,
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(236,72,153,0.35), transparent 70%)',
              }}
            />

            <Box sx={{ position: 'relative' }}>
              <Typography
                sx={{
                  fontSize: '0.66rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#f472b6',
                  mb: 1,
                }}
              >
                Nouvelle collection
              </Typography>

              <Typography
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                }}
              >
                Le style de Kinshasa,
                <br />
                livré chez vous.
              </Typography>

              <Button
                component={Link}
                to="/shop"
                variant="contained"
                disableElevation
                endIcon={<ArrowForwardRounded />}
                sx={{
                  mt: 2.5,
                  px: 2.5,
                  minHeight: 44,
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  bgcolor: H.accent,
                  '&:hover': { bgcolor: H.accentDeep },
                }}
              >
                Voir la boutique
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

function MobileSection({ title }) {
  return (
    <Typography
      sx={{
        px: 3,
        pt: 2,
        pb: 1,
        fontSize: '0.64rem',
        fontWeight: 700,
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: H.muted,
      }}
    >
      {title}
    </Typography>
  );
}

/* -------------------------------------------------------------------------
   Styles partagés
-------------------------------------------------------------------------- */

const iconButtonStyles = {
  width: 42,
  height: 42,
  color: H.ink,
  transition: 'background-color .2s ease, transform .2s ease',
  '&:hover': { bgcolor: H.surfaceAlt, transform: 'translateY(-1px)' },
};

function mobileItemStyles(active) {
  return {
    borderRadius: '12px',
    py: 1.25,
    bgcolor: active ? 'rgba(236, 72, 153, 0.08)' : 'transparent',
    '&:hover': { bgcolor: 'rgba(236, 72, 153, 0.08)' },
  };
}

export default Header;
