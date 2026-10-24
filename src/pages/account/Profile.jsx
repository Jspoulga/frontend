import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Link } from 'react-router-dom';

import Reveal from '../../components/common/Reveal';
import { useDispatch, useSelector } from 'react-redux';

import {
  Alert,
  Avatar,
  Box,
  Button,
  Chip,
  Collapse,
  Container,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  ArrowBackRounded,
  ArrowForwardRounded,
  CheckCircleRounded,
  EmailOutlined,
  StraightenRounded,
  PhoneIphoneOutlined,
  VerifiedRounded,
  FavoriteBorderRounded,
  HomeOutlined,
  LockOutlined,
  NotificationsNoneOutlined,
  PersonOutlineRounded,
  RadioButtonUncheckedRounded,
  SaveRounded,
  ShieldOutlined,
  ShoppingBagOutlined,
} from '@mui/icons-material';

import { updateUser } from '../../store/slices/authSlice';

/* -------------------------------------------------------------------------
   Design tokens
   Une seule source de vérité pour les couleurs, rayons et échelles de texte.
   Objectif "pro" : peu de couleurs, une seule teinte de marque, du contraste.
-------------------------------------------------------------------------- */

const T = {
  canvas: 'var(--pv-canvas)',
  surface: 'var(--pv-surface)',
  surfaceAlt: 'var(--pv-surface-alt)',
  ink: 'var(--pv-ink)',
  body: 'var(--pv-body)',
  muted: 'var(--pv-muted)',
  line: 'var(--pv-line)',
  accent: '#ec4899',
  accentText: 'var(--pv-accent-deep)',
  accentSoft: 'var(--pv-accent-soft)',
  error: 'var(--pv-error)',
  success: 'var(--pv-success)',
  successSoft: 'var(--pv-success-soft)',
  radius: 12,
  radiusLg: 18,
};

/* Échelle typographique : 4 tailles, 3 graisses. Rien en dessous de 12px. */
const TYPE = {
  display: { fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1 },
  title: { fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-0.015em', color: T.ink },
  body: { fontSize: '0.875rem', lineHeight: 1.65, color: T.body },
  caption: { fontSize: '0.78rem', lineHeight: 1.55, color: T.muted },
  overline: { fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase' },
};

const NAV_ITEMS = [
  {
    to: '/account/measurements',
    Icon: StraightenRounded,
    title: 'Mon passeport de mesures',
    subtitle: 'Pour vos pièces sur mesure',
  },
  { to: '/orders', Icon: ShoppingBagOutlined, title: 'Mes commandes', subtitle: 'Suivi et historique' },
  { to: '/wishlist', Icon: FavoriteBorderRounded, title: 'Mes favoris', subtitle: 'Articles enregistrés' },
  { to: '/account/addresses', Icon: HomeOutlined, title: 'Mes adresses', subtitle: 'Livraison et facturation' },
  { to: '/account/notifications', Icon: NotificationsNoneOutlined, title: 'Notifications', subtitle: 'Emails et alertes' },
  { to: '/account/security', Icon: ShieldOutlined, title: 'Sécurité', subtitle: 'Mot de passe et connexion' },
];

const MIN_NAME_LENGTH = 2;
const SAVED_FEEDBACK_MS = 4000;

function initialsOf(value) {
  const parts = value.trim().split(/\s+/).filter(Boolean).slice(0, 2);

  if (!parts.length) {
    return 'K';
  }

  return parts.map(part => part.charAt(0).toUpperCase()).join('');
}

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  const storedName = (user?.name || '').trim();
  const email = (user?.email || '').trim();
  const phone = (user?.phone || '').trim();
  const phoneVerified = Boolean(user?.phoneVerified);

  const [name, setName] = useState(storedName);
  const [touched, setTouched] = useState(false);
  const [saved, setSaved] = useState(false);

  const savedTimer = useRef(null);

  /* Le store reste la source de vérité : on resynchronise si l'utilisateur change. */
  useEffect(() => {
    setName(storedName);
    setTouched(false);
  }, [storedName]);

  /* Sans ce nettoyage, le timer met à jour un composant démonté. */
  useEffect(() => () => clearTimeout(savedTimer.current), []);

  const trimmedName = name.trim();
  const isTooShort = trimmedName.length < MIN_NAME_LENGTH;
  const isDirty = trimmedName !== storedName;
  const canSave = isDirty && !isTooShort;

  const nameError = touched && isTooShort
    ? `Votre nom doit contenir au moins ${MIN_NAME_LENGTH} caractères.`
    : '';

  const handleSubmit = useCallback(
    event => {
      event.preventDefault();
      setTouched(true);

      if (!isDirty || isTooShort) {
        return;
      }

      dispatch(updateUser({ name: trimmedName }));
      setName(trimmedName);
      setSaved(true);

      clearTimeout(savedTimer.current);
      savedTimer.current = setTimeout(() => setSaved(false), SAVED_FEEDBACK_MS);
    },
    [dispatch, isDirty, isTooShort, trimmedName],
  );

  const handleReset = useCallback(() => {
    setName(storedName);
    setTouched(false);
  }, [storedName]);

  const displayName = storedName || 'Votre profil';
  const initials = initialsOf(storedName);

  /*
   * Complétion du profil. Le numéro compte double à Kinshasa : c'est
   * lui qui reçoit la demande Mobile Money et que le livreur appelle.
   * On distingue donc « renseigné » de « confirmé ».
   */
  const checklist = useMemo(
    () => [
      { label: 'Nom renseigné', done: storedName.length >= MIN_NAME_LENGTH },
      { label: 'Numéro de téléphone', done: Boolean(phone) },
      { label: 'Numéro confirmé par SMS', done: phoneVerified },
      { label: 'Adresse email', done: Boolean(email) },
    ],
    [storedName, phone, phoneVerified, email],
  );

  const completed = checklist.filter(item => item.done).length;
  const progress = Math.round((completed / checklist.length) * 100);

  return (
    <Box component="main" sx={{ minHeight: '100vh', bgcolor: T.canvas, pb: { xs: 12, md: 9 } }}>

      {/* =====================================================================
          En-tête
      ====================================================================== */}

      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          color: '#fff',
          background: 'linear-gradient(120deg, #121016 0%, #1b141c 55%, #2a1526 100%)',
          pt: { xs: 3, md: 4 },
          pb: { xs: 8, md: 10 },
        }}
      >
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            width: 520,
            height: 520,
            right: -180,
            top: -300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(236,72,153,0.22), transparent 68%)',
            pointerEvents: 'none',
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 1,
            /* L'en-tête suit la colonne de contenu, sinon le titre reste
               collé au bord pendant que les cartes sont centrées. */
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

            '&& > *': {
              width: '100%',
              maxWidth: { xs: 720, lg: 1104 },
            },

            '&& > .MuiButtonBase-root': { justifyContent: 'flex-start' },
          }}
        >
          <Button
            component={Link}
            to="/"
            startIcon={<ArrowBackRounded />}
            sx={{
              px: 0,
              mb: { xs: 3, md: 4 },
              color: 'rgba(255,255,255,0.7)',
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '0.85rem',
              '&:hover': { color: '#fff', bgcolor: 'transparent' },
            }}
          >
            Retour à l'accueil
          </Button>

          <Typography sx={{ ...TYPE.overline, color: '#f472b6', mb: 1.25 }}>
            Compte Pivot Store
          </Typography>

          <Typography component="h1" sx={TYPE.display}>
            Profil
          </Typography>

          <Typography sx={{ ...TYPE.body, mt: 1.5, maxWidth: 560, color: 'rgba(255,255,255,0.66)' }}>
            Vos informations personnelles, vos préférences et la sécurité de
            votre compte, réunies au même endroit.
          </Typography>
        </Container>
      </Box>

      {/* =====================================================================
          Contenu
      ====================================================================== */}

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, mt: { xs: -5, md: -6 } }}>
        <Box
          sx={{
            display: 'grid',
            gap: { xs: 2, md: 3 },
            /*
              Colonne plafonnée et centrée : sans cela les cartes
              suivaient la largeur de l'écran, avec un grand vide à
              droite des formulaires. Mêmes valeurs que la page Sécurité.
            */
            gridTemplateColumns: {
              xs: 'minmax(0, 720px)',
              lg: 'minmax(0, 720px) minmax(300px, 360px)',
            },
            justifyContent: 'center',
            alignItems: 'start',
          }}
        >

          {/* ---------------------------------------------------------------
              Colonne principale
          ---------------------------------------------------------------- */}

          <Stack spacing={{ xs: 2, md: 3 }} sx={{ minWidth: 0 }}>

            <Card sx={{ p: 0, overflow: 'hidden' }}>
              <Box
                sx={{
                  px: { xs: 2.5, md: 4 },
                  py: { xs: 3, md: 3.5 },
                  borderBottom: `1px solid ${T.line}`,
                }}
              >
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2.5}
                  sx={{
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    justifyContent: 'space-between',
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    sx={{ alignItems: 'center', minWidth: 0, width: '100%' }}
                  >
                    <Avatar
                      sx={{
                        width: { xs: 60, md: 68 },
                        height: { xs: 60, md: 68 },
                        borderRadius: '20px',
                        fontSize: { xs: '1.25rem', md: '1.4rem' },
                        fontWeight: 700,
                        letterSpacing: '0.02em',
                        color: '#fff',
                        background: `linear-gradient(135deg, ${T.accent} 0%, #a855f7 100%)`,
                      }}
                    >
                      {initials}
                    </Avatar>

                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        sx={{
                          fontSize: { xs: '1.15rem', md: '1.3rem' },
                          fontWeight: 700,
                          letterSpacing: '-0.02em',
                          color: T.ink,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {displayName}
                      </Typography>

                      <Typography
                        sx={{
                          ...TYPE.caption,
                          mt: 0.25,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {email || 'Aucune adresse email enregistrée'}
                      </Typography>
                    </Box>
                  </Stack>

                  <Chip
                    icon={<CheckCircleRounded sx={{ fontSize: '16px !important' }} />}
                    label="Compte actif"
                    sx={{
                      height: 30,
                      flexShrink: 0,
                      bgcolor: T.successSoft,
                      color: T.success,
                      border: '1px solid rgba(21, 128, 61, 0.14)',
                      fontWeight: 600,
                      fontSize: '0.72rem',
                      '& .MuiChip-icon': { color: T.success },
                    }}
                  />
                </Stack>
              </Box>

              {/* Formulaire ------------------------------------------------ */}

              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ px: { xs: 2.5, md: 4 }, py: { xs: 3, md: 3.5 } }}
              >
                <SectionHeader
                  icon={<PersonOutlineRounded />}
                  title="Informations personnelles"
                  description="Ces informations apparaissent sur vos commandes."
                />

                <Collapse in={saved} unmountOnExit>
                  <Alert
                    role="status"
                    icon={<CheckCircleRounded fontSize="inherit" />}
                    severity="success"
                    sx={{
                      mb: 2.5,
                      borderRadius: `${T.radius}px`,
                      fontSize: '0.82rem',
                      alignItems: 'center',
                    }}
                  >
                    Vos modifications ont été enregistrées.
                  </Alert>
                </Collapse>

                {/* Même colonne de saisie que la page Sécurité. */}
                <Stack spacing={2.5} sx={{ maxWidth: 520 }}>
                  <TextField
                    fullWidth
                    id="profile-name"
                    label="Nom complet"
                    value={name}
                    onChange={event => setName(event.target.value)}
                    onBlur={() => setTouched(true)}
                    error={Boolean(nameError)}
                    helperText={nameError || 'Le nom affiché sur votre compte et vos commandes.'}
                    placeholder="Ex. Marie Kabongo"
                    autoComplete="name"
                    slotProps={{
                      input: {
                        startAdornment: <PersonOutlineRounded sx={{ mr: 1.2, color: T.muted }} />,
                      },
                    }}
                    sx={fieldStyles}
                  />

                  <TextField
                    fullWidth
                    id="profile-phone"
                    label="Téléphone"
                    value={phone || 'Non renseigné'}
                    disabled
                    slotProps={{
                      input: {
                        startAdornment: (
                          <PhoneIphoneOutlined sx={{ mr: 1.2, color: T.muted }} />
                        ),
                        endAdornment: phoneVerified ? (
                          <VerifiedRounded sx={{ color: T.success, fontSize: 20 }} />
                        ) : null,
                      },
                    }}
                    helperText={
                      phone
                        ? phoneVerified
                          ? 'Numéro confirmé : il recevra vos demandes de paiement.'
                          : 'Numéro non confirmé. Confirmez-le depuis Sécurité.'
                        : 'Ajoutez un numéro pour payer par Mobile Money.'
                    }
                    sx={{
                      ...fieldStyles,
                      '& .MuiOutlinedInput-root': {
                        ...fieldStyles['& .MuiOutlinedInput-root'],
                        bgcolor: T.surfaceAlt,
                      },
                    }}
                  />

                  <TextField
                    fullWidth
                    id="profile-email"
                    label="Adresse email"
                    value={email}
                    disabled
                    slotProps={{
                      input: {
                        startAdornment: <EmailOutlined sx={{ mr: 1.2, color: T.muted }} />,
                      },
                    }}
                    helperText="Pour modifier votre email, passez par Sécurité."
                    sx={{
                      ...fieldStyles,
                      '& .MuiOutlinedInput-root': {
                        ...fieldStyles['& .MuiOutlinedInput-root'],
                        bgcolor: T.surfaceAlt,
                      },
                    }}
                  />

                  <Stack
                    direction={{ xs: 'column-reverse', sm: 'row' }}
                    spacing={1.5}
                    sx={{ justifyContent: 'flex-end', pt: 0.5 }}
                  >
                    <Button
                      type="button"
                      onClick={handleReset}
                      disabled={!isDirty}
                      sx={{
                        minHeight: 48,
                        px: 2.5,
                        borderRadius: `${T.radius}px`,
                        textTransform: 'none',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        color: T.body,
                        '&:hover': { bgcolor: T.surfaceAlt },
                      }}
                    >
                      Annuler
                    </Button>

                    <Button
                      type="submit"
                      variant="contained"
                      disableElevation
                      disabled={!canSave}
                      startIcon={<SaveRounded />}
                      sx={{
                        minHeight: 48,
                        px: 3,
                        borderRadius: `${T.radius}px`,
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        bgcolor: T.accentText,
                        '&:hover': { bgcolor: '#9d174d' },
                        '&.Mui-disabled': { bgcolor: 'rgba(17,16,22,0.08)', color: T.muted },
                      }}
                    >
                      Enregistrer
                    </Button>
                  </Stack>
                </Stack>
              </Box>
            </Card>

            {/* Complétion du profil ----------------------------------------- */}

            <Card index={1}>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2,
                }}
              >
                <Box>
                  <Typography sx={TYPE.title}>Complétion du profil</Typography>
                  <Typography sx={{ ...TYPE.caption, mt: 0.4 }}>
                    {completed} information{completed > 1 ? 's' : ''} sur {checklist.length} renseignée
                    {completed > 1 ? 's' : ''}.
                  </Typography>
                </Box>

                <Typography sx={{ fontSize: '1.35rem', fontWeight: 700, color: T.ink }}>
                  {progress}%
                </Typography>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={progress}
                aria-label="Progression de la complétion du profil"
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'rgba(17,16,22,0.07)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 3,
                    bgcolor: progress === 100 ? T.success : T.accent,
                  },
                }}
              />

              <Stack spacing={1.25} sx={{ mt: 2.5 }}>
                {checklist.map(item => (
                  <Stack
                    key={item.label}
                    direction="row"
                    spacing={1.25}
                    sx={{ alignItems: 'center' }}
                  >
                    {item.done ? (
                      <CheckCircleRounded sx={{ fontSize: 18, color: T.success }} />
                    ) : (
                      <RadioButtonUncheckedRounded sx={{ fontSize: 18, color: T.muted }} />
                    )}

                    <Typography
                      sx={{
                        ...TYPE.body,
                        fontSize: '0.83rem',
                        color: item.done ? T.body : T.ink,
                        fontWeight: item.done ? 400 : 600,
                      }}
                    >
                      {item.label}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Card>
          </Stack>

          {/* ---------------------------------------------------------------
              Colonne latérale
          ---------------------------------------------------------------- */}

          <Stack spacing={{ xs: 2, md: 3 }} sx={{ minWidth: 0 }}>
            <Card index={2} component="nav" aria-label="Espace personnel" sx={{ p: 1.25 }}>
              <Typography sx={{ ...TYPE.overline, color: T.muted, px: 1.5, pt: 1.25, pb: 1 }}>
                Mon espace
              </Typography>

              {NAV_ITEMS.map(item => (
                <NavRow key={item.to} {...item} />
              ))}
            </Card>

            <Card index={3} sx={{ bgcolor: T.surfaceAlt }}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                <LockOutlined sx={{ fontSize: 20, color: T.accentText, mt: 0.2, flexShrink: 0 }} />

                <Box>
                  <Typography sx={{ ...TYPE.body, fontSize: '0.83rem', fontWeight: 600, color: T.ink }}>
                    Confidentialité
                  </Typography>

                  <Typography sx={{ ...TYPE.caption, mt: 0.5 }}>
                    Pivot Store utilise vos informations uniquement pour sécuriser
                    votre compte et traiter vos commandes.
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

/* -------------------------------------------------------------------------
   Sous-composants
-------------------------------------------------------------------------- */

function Card({ children, sx, index = 0, ...rest }) {
  return (
    <Reveal index={index}>
    <Paper
      elevation={0}
      {...rest}
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: `${T.radiusLg}px`,
        bgcolor: T.surface,
        border: `1px solid ${T.line}`,
        boxShadow: '0 1px 2px rgba(17,16,22,0.04), 0 12px 32px rgba(17,16,22,0.05)',
        ...sx,
      }}
    >
      {children}
    </Paper>
    </Reveal>
  );
}

function SectionHeader({ icon, title, description }) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 3 }}>
      <Box
        aria-hidden
        sx={{
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: `${T.radius}px`,
          bgcolor: T.accentSoft,
          color: T.accentText,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography sx={TYPE.title}>{title}</Typography>
        <Typography sx={{ ...TYPE.caption, mt: 0.3 }}>{description}</Typography>
      </Box>
    </Stack>
  );
}

function NavRow({ to, Icon, title, subtitle }) {
  return (
    <Button
      component={Link}
      to={to}
      fullWidth
      sx={{
        justifyContent: 'flex-start',
        textAlign: 'left',
        textTransform: 'none',
        color: T.ink,
        borderRadius: `${T.radius}px`,
        px: 1.25,
        py: 1.25,
        '&:hover': { bgcolor: T.accentSoft, color: T.accentText },
        '&:hover .nav-row-icon': { bgcolor: 'var(--pv-surface)', color: T.accentText },
      }}
    >
      <Box
        className="nav-row-icon"
        sx={{
          width: 38,
          height: 38,
          mr: 1.5,
          flexShrink: 0,
          borderRadius: `${T.radius - 2}px`,
          bgcolor: T.surfaceAlt,
          color: T.body,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background-color 0.15s ease, color 0.15s ease',
        }}
      >
        <Icon sx={{ fontSize: 19 }} />
      </Box>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, lineHeight: 1.35, color: 'inherit' }}>
          {title}
        </Typography>

        <Typography sx={{ ...TYPE.caption, fontSize: '0.73rem', mt: 0.15 }}>
          {subtitle}
        </Typography>
      </Box>

      <ArrowForwardRounded sx={{ fontSize: 17, color: T.muted, flexShrink: 0 }} />
    </Button>
  );
}

/* -------------------------------------------------------------------------
   Styles de champ partagés — MUI gère l'état focus, pas besoin de state React.
-------------------------------------------------------------------------- */

const fieldStyles = {
  '& .MuiOutlinedInput-root': {
    minHeight: 54,
    borderRadius: `${T.radius}px`,
    bgcolor: T.surface,
    fontSize: '0.9rem',
    '& fieldset': { borderColor: T.line },
    '&:hover fieldset': { borderColor: 'rgba(236,72,153,0.35)' },
    '&.Mui-focused fieldset': { borderColor: T.accent, borderWidth: '1.5px' },
    '&.Mui-focused .MuiSvgIcon-root': { color: T.accent },
  },
  '& .MuiInputLabel-root': { fontSize: '0.9rem' },
  '& .MuiInputLabel-root.Mui-focused': { color: T.accentText },
  '& .MuiFormHelperText-root': {
    fontSize: '0.75rem',
    color: T.muted,
    marginLeft: '4px',
    '&.Mui-error': { color: T.error },
  },
};

export default Profile;
