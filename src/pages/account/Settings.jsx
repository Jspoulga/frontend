import React, { useCallback, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  Alert,
  Box,
  Button,
  Collapse,
  Container,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

import ArrowBackRounded from '@mui/icons-material/ArrowBackRounded';
import NotificationsActiveOutlined from '@mui/icons-material/NotificationsActiveOutlined';
import LocalShippingOutlined from '@mui/icons-material/LocalShippingOutlined';
import ShieldOutlined from '@mui/icons-material/ShieldOutlined';
import DownloadRounded from '@mui/icons-material/DownloadRounded';
import DeleteForeverRounded from '@mui/icons-material/DeleteForeverRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';
import LanguageRounded from '@mui/icons-material/LanguageRounded';
import DarkModeRounded from '@mui/icons-material/DarkModeRounded';
import PaymentsOutlined from '@mui/icons-material/PaymentsOutlined';
import RestartAltRounded from '@mui/icons-material/RestartAltRounded';

import useTranslation from '../../hooks/useTranslation';
import api from '../../services/api';
import { readApiError } from '../../services/api';
import Reveal from '../../components/common/Reveal';
import formatCurrency from '../../utils/formatCurrency';
import { LANGUAGES } from '../../i18n/translations';

import {
  resetPreferences,
  setCurrency,
  setLanguage,
  setThemeMode,
} from '../../store/slices/settingsSlice';

const T = {
  ink: 'var(--pv-ink)',
  body: 'var(--pv-body)',
  muted: 'var(--pv-muted)',
  line: 'var(--pv-line)',
  accent: '#ec4899',
  accentDeep: 'var(--pv-accent-deep)',
  accentSoft: 'var(--pv-accent-soft)',
};

/* Prix d'exemple pour montrer immédiatement l'effet d'un changement de devise. */
const PREVIEW_AMOUNT = 75000;

function Settings() {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const themeMode = useSelector(state => state.settings.themeMode);

  /*
   * Préférences d'envoi, de livraison et de confidentialité. Elles
   * vivent sur le serveur, pas dans le navigateur : elles commandent
   * réellement ce qui part vers le client.
   */
  const [prefs, setPrefs] = useState(null);
  const [prefsError, setPrefsError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleting, setDeleting] = useState(false);

  const loadPrefs = useCallback(async () => {
    try {
      const { data } = await api.get('/users/me/preferences');

      setPrefs(data);
    } catch (error) {
      setPrefsError(readApiError(error, 'Préférences indisponibles.'));
    }
  }, []);

  useEffect(() => {
    loadPrefs();
  }, [loadPrefs]);

  /* Enregistrement immédiat : un interrupteur n'a pas de bouton « valider ». */
  const savePrefs = async changes => {
    const previous = prefs;

    setPrefs(current => ({
      ...current,
      ...changes,
      channels: { ...current.channels, ...(changes.channels || {}) },
      topics: { ...current.topics, ...(changes.topics || {}) },
    }));

    try {
      const { data } = await api.put('/users/me/preferences', changes);

      setPrefs(data);
      flash();
    } catch (error) {
      /* Échec : on remet l'interrupteur où il était plutôt que de
         laisser croire que le réglage est pris en compte. */
      setPrefs(previous);
      setPrefsError(readApiError(error, 'Enregistrement impossible.'));
    }
  };

  const exportData = () => {
    window.open(`${api.defaults.baseURL}/users/me/export`, '_blank');
  };

  const deleteAccount = async () => {
    setDeleting(true);

    try {
      await api.post('/users/me/delete', { password: deletePassword });

      /* Le compte n'existe plus : on repart de zéro. */
      localStorage.clear();
      window.location.href = '/';
    } catch (error) {
      setPrefsError(readApiError(error, 'Suppression impossible.'));
      setDeleting(false);
    }
  };

  const language = useSelector(state => state.settings.language);
  const currency = useSelector(state => state.settings.currency);
  const currencies = useSelector(state => state.settings.currencies);
  const offline = useSelector(state => state.settings.offline);

  const [saved, setSaved] = useState(false);

  const flash = () => {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  };

  const chooseLanguage = code => {
    dispatch(setLanguage(code));
    flash();
  };

  const chooseCurrency = code => {
    dispatch(setCurrency(code));
    flash();
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'var(--pv-canvas)', pb: { xs: 12, md: 9 } }}>
      <Box
        sx={{
          background:
            'linear-gradient(120deg, #121016 0%, #1b141c 55%, #2a1526 100%)',
          color: '#fff',
          pt: { xs: 3, md: 4 },
          pb: { xs: 8, md: 10 },
        }}
      >
        <Container maxWidth="md">
          <Button
            component={Link}
            to="/account/profile"
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
            {t('account.profile')}
          </Button>

          <Typography
            sx={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#f472b6',
              mb: 1.25,
            }}
          >
            Pivot Store
          </Typography>

          <Typography
            component="h1"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 700,
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
            }}
          >
            {t('settings.title')}
          </Typography>

          <Typography
            sx={{
              mt: 1.5,
              maxWidth: 520,
              fontSize: '0.875rem',
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.66)',
            }}
          >
            {t('settings.subtitle')}
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="md" sx={{ mt: { xs: -5, md: -6 }, position: 'relative' }}>
        <Collapse in={saved} unmountOnExit>
          <Alert
            severity="success"
            role="status"
            sx={{ mb: 2, borderRadius: '14px', fontSize: '0.85rem' }}
          >
            {t('settings.saved')}
          </Alert>
        </Collapse>

        {offline && (
          <Alert severity="warning" sx={{ mb: 2, borderRadius: '14px', fontSize: '0.82rem' }}>
            {t('common.offline')}
          </Alert>
        )}

        <Stack spacing={{ xs: 2, md: 3 }}>
          <Card>
            <SectionHeader
              icon={<DarkModeRounded />}
              title={t('settings.appearance')}
              description={t('settings.appearanceHelp')}
            />

            <Box
              sx={{
                display: 'grid',
                gap: 1.25,
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              }}
            >
              {[
                { code: 'light', label: t('settings.themeLight'), emoji: '☀️' },
                { code: 'dark', label: t('settings.themeDark'), emoji: '🌙' },
                { code: 'system', label: t('settings.themeSystem'), emoji: '🖥️' },
              ].map(item => (
                <ChoiceTile
                  key={item.code}
                  selected={themeMode === item.code}
                  onClick={() => dispatch(setThemeMode(item.code))}
                  title={item.label}
                  emoji={item.emoji}
                />
              ))}
            </Box>
          </Card>

          <Card index={1}>
            <SectionHeader
              icon={<LanguageRounded />}
              title={t('settings.language')}
              description={t('settings.languageHelp')}
            />

            <Box
              sx={{
                display: 'grid',
                gap: 1.25,
                gridTemplateColumns: {
                  xs: 'repeat(2, minmax(0, 1fr))',
                  sm: 'repeat(4, minmax(0, 1fr))',
                },
              }}
            >
              {LANGUAGES.map(item => (
                <ChoiceTile
                  key={item.code}
                  selected={language === item.code}
                  onClick={() => chooseLanguage(item.code)}
                  title={item.label}
                  subtitle={item.code.toUpperCase()}
                  emoji={item.flag}
                />
              ))}
            </Box>
          </Card>

          <Card index={2}>
            <SectionHeader
              icon={<PaymentsOutlined />}
              title={t('settings.currency')}
              description={t('settings.currencyHelp')}
            />

            <Box
              sx={{
                display: 'grid',
                gap: 1.25,
                gridTemplateColumns: {
                  xs: 'repeat(1, minmax(0, 1fr))',
                  sm: 'repeat(3, minmax(0, 1fr))',
                },
              }}
            >
              {currencies.map(item => (
                <ChoiceTile
                  key={item.code}
                  selected={currency === item.code}
                  onClick={() => chooseCurrency(item.code)}
                  title={item.label}
                  subtitle={
                    item.perUnit === 1
                      ? item.code
                      : `1 ${item.symbol} = ${Number(item.perUnit).toLocaleString('fr-CD')} FC`
                  }
                  emoji={item.symbol}
                />
              ))}
            </Box>

            <Divider sx={{ my: 2.5 }} />

            <Stack
              direction="row"
              spacing={2}
              sx={{ alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Box>
                <Typography sx={{ fontSize: '0.72rem', color: T.muted }}>
                  {t('settings.preview')}
                </Typography>

                <Typography
                  sx={{
                    mt: 0.3,
                    fontSize: '1.4rem',
                    fontWeight: 700,
                    color: T.ink,
                    letterSpacing: '-0.02em',
                  }}
                >
                  {formatCurrency(PREVIEW_AMOUNT)}
                </Typography>
              </Box>

              <Typography sx={{ fontSize: '0.72rem', color: T.muted, textAlign: 'right' }}>
                75 000 FC
              </Typography>
            </Stack>
          </Card>

          {/* ---------------------------------------------------------
              Notifications : ces interrupteurs commandent réellement
              les envois, ce ne sont pas des réglages décoratifs.
          ---------------------------------------------------------- */}
          {prefs ? (
            <Card index={3}>
              <SectionHeader
                icon={<NotificationsActiveOutlined />}
                title="Notifications"
                description="Choisissez ce que vous recevez, et par quel canal."
              />

              <Stack spacing={0.5}>
                <ToggleRow
                  label="SMS"
                  hint="Le seul canal qui vous atteint sans forfait données."
                  checked={prefs.channels.sms}
                  onChange={value => savePrefs({ channels: { sms: value } })}
                />

                <ToggleRow
                  label="Email"
                  hint="Récapitulatifs et factures."
                  checked={prefs.channels.email}
                  onChange={value => savePrefs({ channels: { email: value } })}
                />

                <ToggleRow
                  label="Notifications de l'application"
                  checked={prefs.channels.push}
                  onChange={value => savePrefs({ channels: { push: value } })}
                />
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={0.5}>
                <ToggleRow
                  label="Mes commandes"
                  hint="Confirmation, préparation, expédition."
                  checked={prefs.topics.orders}
                  onChange={value => savePrefs({ topics: { orders: value } })}
                />

                <ToggleRow
                  label="Livraison"
                  checked={prefs.topics.delivery}
                  onChange={value => savePrefs({ topics: { delivery: value } })}
                />

                <ToggleRow
                  label="Paiements"
                  checked={prefs.topics.payments}
                  onChange={value => savePrefs({ topics: { payments: value } })}
                />

                <ToggleRow
                  label="Offres et nouveautés"
                  hint="Désactivé par défaut : on ne s'invite pas sans y être convié."
                  checked={prefs.topics.promotions}
                  onChange={value => savePrefs({ topics: { promotions: value } })}
                />
              </Stack>
            </Card>
          ) : null}

          {/* Créneau de livraison souhaité */}
          {prefs ? (
            <Card index={4}>
              <SectionHeader
                icon={<LocalShippingOutlined />}
                title="Livraison"
                description="Le moment où il est le plus simple de vous joindre."
              />

              <Box
                sx={{
                  display: 'grid',
                  gap: 1.25,
                  gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
                }}
              >
                {[
                  { code: 'any', label: 'Peu importe', emoji: '🕒' },
                  { code: 'morning', label: 'Matin', emoji: '🌅' },
                  { code: 'afternoon', label: 'Après-midi', emoji: '☀️' },
                  { code: 'evening', label: 'Soir', emoji: '🌙' },
                ].map(item => (
                  <ChoiceTile
                    key={item.code}
                    selected={prefs.deliveryWindow === item.code}
                    onClick={() => savePrefs({ deliveryWindow: item.code })}
                    title={item.label}
                    emoji={item.emoji}
                  />
                ))}
              </Box>
            </Card>
          ) : null}

          {/* Données personnelles */}
          <Card index={5}>
            <SectionHeader
              icon={<ShieldOutlined />}
              title="Mes données"
              description="Emporter une copie de vos données, ou fermer votre compte."
            />

            {prefsError ? (
              <Alert severity="error" sx={{ mb: 2, borderRadius: '14px', fontSize: '0.82rem' }}>
                {prefsError}
              </Alert>
            ) : null}

            <Stack spacing={1.5}>
              <Button
                onClick={exportData}
                startIcon={<DownloadRounded />}
                variant="outlined"
                sx={{ alignSelf: 'flex-start', textTransform: 'none', fontWeight: 700 }}
              >
                Télécharger mes données
              </Button>

              <Typography sx={{ fontSize: 12.5, color: T.muted }}>
                Compte, mesures, adresses, commandes, avis et notifications,
                dans un fichier. Votre mot de passe n'y figure jamais.
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Button
                onClick={() => setConfirmDelete(true)}
                startIcon={<DeleteForeverRounded />}
                color="error"
                sx={{ alignSelf: 'flex-start', textTransform: 'none', fontWeight: 700 }}
              >
                Supprimer mon compte
              </Button>

              <Typography sx={{ fontSize: 12.5, color: T.muted }}>
                Irréversible. Vos commandes sont conservées pour la comptabilité
                de la boutique, mais détachées de votre nom.
              </Typography>
            </Stack>
          </Card>

          <Box sx={{ textAlign: 'center' }}>
            <Button
              onClick={() => {
                dispatch(resetPreferences());
                flash();
              }}
              startIcon={<RestartAltRounded sx={{ fontSize: '18px !important' }} />}
              sx={{
                textTransform: 'none',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: T.body,
                '&:hover': { bgcolor: 'transparent', color: T.accentDeep },
              }}
            >
              {t('settings.reset')}
            </Button>
          </Box>
        </Stack>
      </Container>

      {/*
        Suppression : le mot de passe est redemandé. C'est irréversible,
        et un téléphone laissé déverrouillé ne doit pas suffire.
      */}
      <Dialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        PaperProps={{ sx: { borderRadius: '22px' } }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>Supprimer votre compte ?</DialogTitle>

        <DialogContent>
          <Typography sx={{ color: T.body, fontSize: 14.5, mb: 2.5 }}>
            Vos mesures, adresses, favoris et préférences seront effacés
            définitivement. Vos commandes sont conservées pour la comptabilité
            de la boutique, mais détachées de votre nom.
          </Typography>

          <TextField
            fullWidth
            type="password"
            label="Confirmez avec votre mot de passe"
            value={deletePassword}
            onChange={event => setDeletePassword(event.target.value)}
          />
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setConfirmDelete(false)}>Annuler</Button>

          <Button
            onClick={deleteAccount}
            color="error"
            variant="contained"
            disabled={deleting || deletePassword.length === 0}
          >
            {deleting ? 'Suppression…' : 'Supprimer définitivement'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

/* Une ligne d'interrupteur : libellé, explication facultative, bascule. */
function ToggleRow({ label, hint, checked, onChange }) {
  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ alignItems: 'center', justifyContent: 'space-between', py: 0.75 }}
    >
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 14.5, fontWeight: 600, color: T.ink }}>
          {label}
        </Typography>

        {hint ? (
          <Typography sx={{ fontSize: 12.5, color: T.muted, mt: 0.2 }}>
            {hint}
          </Typography>
        ) : null}
      </Box>

      <Switch
        checked={Boolean(checked)}
        onChange={event => onChange(event.target.checked)}
        inputProps={{ 'aria-label': label }}
      />
    </Stack>
  );
}

function Card({ children, index = 0 }) {
  return (
    <Reveal index={index}>
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: '20px',
        bgcolor: 'var(--pv-surface)',
        border: `1px solid ${T.line}`,
        boxShadow: '0 1px 2px rgba(17,16,22,0.04), 0 12px 32px rgba(17,16,22,0.05)',
      }}
    >
      {children}
    </Paper>
    </Reveal>
  );
}

function SectionHeader({ icon, title, description }) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2.5 }}>
      <Box
        aria-hidden
        sx={{
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: '12px',
          bgcolor: T.accentSoft,
          color: T.accentDeep,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography sx={{ fontSize: '1.05rem', fontWeight: 700, color: T.ink }}>
          {title}
        </Typography>

        <Typography sx={{ mt: 0.3, fontSize: '0.78rem', color: T.muted, lineHeight: 1.5 }}>
          {description}
        </Typography>
      </Box>
    </Stack>
  );
}

function ChoiceTile({ selected, onClick, title, subtitle, emoji }) {
  return (
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      sx={{
        position: 'relative',
        p: 1.5,
        cursor: 'pointer',
        textAlign: 'left',
        borderRadius: '14px',
        bgcolor: selected ? T.accentSoft : 'var(--pv-surface)',
        border: selected
          ? `1.5px solid ${T.accent}`
          : `1px solid ${T.line}`,
        transition: 'transform .18s ease, border-color .18s ease, background-color .18s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: 'rgba(236,72,153,0.4)',
        },
      }}
    >
      {selected && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 18,
            height: 18,
            borderRadius: '50%',
            bgcolor: T.accent,
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CheckRounded sx={{ fontSize: 13 }} />
        </Box>
      )}

      <Typography sx={{ fontSize: '1.1rem', lineHeight: 1 }}>{emoji}</Typography>

      <Typography
        sx={{
          mt: 1,
          fontSize: '0.85rem',
          fontWeight: 700,
          color: selected ? T.accentDeep : T.ink,
        }}
      >
        {title}
      </Typography>

      {/* Les tuiles d'apparence n'ont pas de sous-titre : sans cette
          condition, elles gardent une ligne vide et dépassent les autres. */}
      {subtitle ? (
        <Typography sx={{ mt: 0.2, fontSize: '0.68rem', color: T.muted }}>
          {subtitle}
        </Typography>
      ) : null}
    </Box>
  );
}

export default Settings;
