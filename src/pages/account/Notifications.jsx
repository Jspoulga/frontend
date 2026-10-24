import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Link } from 'react-router-dom';
import {
  Alert,
  Badge,
  Box,
  Button,
  Chip,
  Container,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import {
  ArrowBackRounded,
  DoneAllRounded,
  LocalShippingOutlined,
  NotificationsNoneRounded,
  PaymentsOutlined,
  PersonOutlineRounded,
  ShoppingBagOutlined,
  TuneRounded,
} from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';

import api from '../../services/api';
import { readApiError } from '../../services/api';
import Reveal from '../../components/common/Reveal';

/*
 * ------------------------------------------------------------------
 * Notifications
 * ------------------------------------------------------------------
 *
 * Le journal de ce que la boutique a dit au client : commande
 * confirmée, paiement reçu, colis en route.
 *
 * Il sert à deux choses. Au client, à retrouver une information sans
 * fouiller ses SMS. À la boutique, à répondre à « je n'ai jamais reçu
 * de message » — chaque envoi laisse une trace datée, même quand le
 * canal externe a échoué.
 *
 * Les réglages d'envoi, eux, vivent dans les Paramètres : cette page
 * montre l'historique, elle ne le configure pas.
 */

const T = {
  ink: 'var(--pv-ink)',
  body: 'var(--pv-body)',
  muted: 'var(--pv-muted)',
  line: 'var(--pv-line)',
  surface: 'var(--pv-surface)',
  surfaceAlt: 'var(--pv-surface-alt)',
  accentDeep: 'var(--pv-accent-deep)',
};

const TYPES = {
  order: { label: 'Commande', Icon: ShoppingBagOutlined, color: '#A855F7' },
  payment: { label: 'Paiement', Icon: PaymentsOutlined, color: '#EC4899' },
  delivery: { label: 'Livraison', Icon: LocalShippingOutlined, color: '#F59E0B' },
  account: { label: 'Compte', Icon: PersonOutlineRounded, color: '#64748B' },
  promo: { label: 'Offre', Icon: NotificationsNoneRounded, color: '#16A34A' },
};

const FILTERS = [
  { value: 'all', label: 'Toutes' },
  { value: 'unread', label: 'Non lues' },
  { value: 'order', label: 'Commandes' },
  { value: 'delivery', label: 'Livraison' },
];

/* « il y a 3 h », plus lisible qu'une date complète pour du récent. */
function relativeTime(iso) {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const seconds = Math.round((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return "à l'instant";
  if (seconds < 3600) return `il y a ${Math.floor(seconds / 60)} min`;
  if (seconds < 86400) return `il y a ${Math.floor(seconds / 3600)} h`;
  if (seconds < 604800) return `il y a ${Math.floor(seconds / 86400)} j`;

  return date.toLocaleDateString('fr-CD', { day: 'numeric', month: 'long' });
}

function Notifications() {
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/users/me/notifications');

      setItems(Array.isArray(data.items) ? data.items : []);
      setUnread(Number(data.unread) || 0);
      setError('');
    } catch (loadError) {
      setError(readApiError(loadError, 'Notifications indisponibles.'));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const markRead = async notification => {
    if (notification.read) {
      return;
    }

    /* Affichage immédiat : l'accusé de lecture n'a pas à faire attendre. */
    setItems(current =>
      current.map(item => (item.id === notification.id ? { ...item, read: true } : item)),
    );
    setUnread(current => Math.max(0, current - 1));

    try {
      await api.post(`/users/me/notifications/${notification.id}/read`);
    } catch (readError) {
      /* Échec : on remet l'état d'origine plutôt que de mentir. */
      setItems(current =>
        current.map(item => (item.id === notification.id ? { ...item, read: false } : item)),
      );
      setUnread(current => current + 1);
    }
  };

  const markAllRead = async () => {
    try {
      await api.post('/users/me/notifications/read-all');
      await load();
    } catch (allError) {
      setError(readApiError(allError, 'Opération impossible.'));
    }
  };

  const visible = useMemo(() => {
    if (filter === 'all') return items;
    if (filter === 'unread') return items.filter(item => !item.read);

    return items.filter(item => item.type === filter);
  }, [items, filter]);

  return (
    <Box sx={{ bgcolor: 'var(--pv-canvas)', minHeight: '100vh', pb: 8 }}>
      {/* En-tête */}
      <Box sx={{ bgcolor: 'var(--pv-band)', pt: { xs: 4, md: 6 }, pb: { xs: 8, md: 10 } }}>
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            '&& > *': { width: '100%', maxWidth: 720 },
            '&& > .MuiButtonBase-root': { justifyContent: 'flex-start' },
          }}
        >
          <Button
            component={Link}
            to="/account/profile"
            startIcon={<ArrowBackRounded />}
            sx={{ color: 'rgba(255,255,255,.75)', mb: 3, px: 0 }}
          >
            Retour au profil
          </Button>

          <Typography
            sx={{ fontSize: 11, fontWeight: 800, letterSpacing: '.18em', color: '#f472b6', mb: 1 }}
          >
            PIVOT STORE ACCOUNT
          </Typography>

          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Typography
              sx={{
                fontSize: { xs: 34, md: 46 },
                fontWeight: 900,
                letterSpacing: '-.03em',
                color: '#fff',
                lineHeight: 1.05,
              }}
            >
              Notifications
            </Typography>

            {unread > 0 ? (
              <Chip
                label={unread}
                component={motion.div}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                sx={{
                  fontWeight: 800,
                  bgcolor: 'var(--pv-accent)',
                  color: '#fff',
                  height: 28,
                }}
              />
            ) : null}
          </Stack>

          <Typography sx={{ mt: 1.5, color: 'rgba(255,255,255,.68)', fontSize: { xs: 15, md: 17 } }}>
            Tout ce que la boutique vous a envoyé, daté et conservé — même
            lorsque le SMS n'a pas pu partir.
          </Typography>
        </Container>
      </Box>

      <Container
        maxWidth="lg"
        sx={{
          mt: { xs: -5, md: -6 },
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '&& > *': { width: '100%', maxWidth: 720 },
        }}
      >
        <Stack spacing={2}>
          {error ? (
            <Alert severity="error" sx={{ borderRadius: '14px' }}>{error}</Alert>
          ) : null}

          {/* Filtres et action groupée */}
          <Paper
            elevation={0}
            sx={{
              p: 1,
              borderRadius: '18px',
              border: `1px solid ${T.line}`,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              flexWrap: 'wrap',
            }}
          >
            <Tabs
              value={filter}
              onChange={(_event, next) => setFilter(next)}
              variant="scrollable"
              scrollButtons={false}
              sx={{ flex: 1, minHeight: 40, '& .MuiTab-root': { minHeight: 40, fontWeight: 700 } }}
            >
              {FILTERS.map(item => (
                <Tab
                  key={item.value}
                  value={item.value}
                  label={
                    item.value === 'unread' && unread > 0 ? (
                      <Badge badgeContent={unread} color="error" sx={{ pr: 1.5 }}>
                        {item.label}
                      </Badge>
                    ) : (
                      item.label
                    )
                  }
                />
              ))}
            </Tabs>

            {unread > 0 ? (
              <Button
                onClick={markAllRead}
                startIcon={<DoneAllRounded />}
                size="small"
                sx={{ textTransform: 'none', fontWeight: 700 }}
              >
                Tout marquer comme lu
              </Button>
            ) : null}
          </Paper>

          {loading ? (
            <Typography sx={{ color: T.muted }}>Chargement…</Typography>
          ) : visible.length === 0 ? (
            <Reveal>
              <Paper
                elevation={0}
                sx={{
                  p: 5,
                  borderRadius: '20px',
                  border: `1px dashed ${T.line}`,
                  textAlign: 'center',
                }}
              >
                <NotificationsNoneRounded sx={{ fontSize: 44, color: T.muted }} />

                <Typography sx={{ mt: 1.5, fontWeight: 700, color: T.ink }}>
                  {filter === 'all' ? 'Aucune notification' : 'Rien dans ce filtre'}
                </Typography>

                <Typography sx={{ mt: 0.5, fontSize: 13.5, color: T.muted }}>
                  Vos confirmations de commande et suivis de livraison
                  apparaîtront ici.
                </Typography>

                <Button
                  component={Link}
                  to="/account/settings"
                  startIcon={<TuneRounded />}
                  sx={{ mt: 2, textTransform: 'none', fontWeight: 700 }}
                >
                  Régler mes préférences d'envoi
                </Button>
              </Paper>
            </Reveal>
          ) : (
            <AnimatePresence initial={false}>
              {visible.map((notification, index) => {
                const type = TYPES[notification.type] || TYPES.account;
                const Icon = type.Icon;

                return (
                  <Box
                    key={notification.id}
                    component={motion.div}
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                    transition={{
                      duration: 0.34,
                      delay: Math.min(index, 8) * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => markRead(notification)}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        p: { xs: 2, md: 2.5 },
                        borderRadius: '18px',
                        cursor: notification.read ? 'default' : 'pointer',
                        border: `1px solid ${notification.read ? T.line : T.accentDeep}`,
                        /* Non lue : fond légèrement teinté, repérable d'un
                           coup d'œil sans avoir à lire. */
                        bgcolor: notification.read ? T.surface : 'var(--pv-accent-soft)',
                        transition: 'background-color .3s ease, border-color .3s ease',
                      }}
                    >
                      <Stack direction="row" spacing={1.8} sx={{ alignItems: 'flex-start' }}>
                        <Box
                          sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            flexShrink: 0,
                            display: 'grid',
                            placeItems: 'center',
                            bgcolor: T.surfaceAlt,
                          }}
                        >
                          <Icon sx={{ fontSize: 20, color: type.color }} />
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ alignItems: 'center', flexWrap: 'wrap' }}
                          >
                            <Typography sx={{ fontWeight: 800, color: T.ink, fontSize: 15 }}>
                              {notification.title}
                            </Typography>

                            {!notification.read ? (
                              <Box
                                sx={{
                                  width: 7,
                                  height: 7,
                                  borderRadius: '50%',
                                  bgcolor: 'var(--pv-accent)',
                                }}
                              />
                            ) : null}
                          </Stack>

                          <Typography sx={{ mt: 0.4, fontSize: 14, color: T.body, lineHeight: 1.5 }}>
                            {notification.body}
                          </Typography>

                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ mt: 1, alignItems: 'center', flexWrap: 'wrap' }}
                          >
                            <Typography sx={{ fontSize: 12.5, color: T.muted }}>
                              {relativeTime(notification.createdAt)}
                            </Typography>

                            <Chip
                              size="small"
                              label={type.label}
                              sx={{
                                height: 20,
                                fontSize: 11,
                                fontWeight: 700,
                                bgcolor: T.surfaceAlt,
                                color: T.body,
                              }}
                            />

                            {/* La commande concernée, accessible d'un clic. */}
                            {notification.meta?.orderId ? (
                              <Button
                                component={Link}
                                to={`/orders/${notification.meta.orderId}`}
                                size="small"
                                sx={{ textTransform: 'none', fontWeight: 700, py: 0, minWidth: 0 }}
                              >
                                Voir la commande
                              </Button>
                            ) : null}
                          </Stack>
                        </Box>
                      </Stack>
                    </Paper>
                  </Box>
                );
              })}
            </AnimatePresence>
          )}
        </Stack>
      </Container>
    </Box>
  );
}

export default Notifications;
