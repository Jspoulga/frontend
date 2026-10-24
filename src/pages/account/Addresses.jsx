import React, { useCallback, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Chip,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import {
  AddRounded,
  ArrowBackRounded,
  CheckCircleRounded,
  DeleteOutlineRounded,
  EditRounded,
  HomeOutlined,
  PlaceOutlined,
} from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';

import addressService from '../../services/addressService';
import { readApiError } from '../../services/api';
import Reveal from '../../components/common/Reveal';
import {
  COUNTRIES,
  citiesOf,
  districtsOf,
  provinceOf,
} from '../../utils/locations';

/*
 * ------------------------------------------------------------------
 * Carnet d'adresses
 * ------------------------------------------------------------------
 *
 * Ajouter, modifier, supprimer, choisir l'adresse par défaut.
 *
 * La ville se choisit dans une liste plutôt qu'en texte libre : un
 * livreur ne reconnaît pas « Kin », « kinshasa » et « KINSHSA » comme
 * une seule destination. Pour Kinshasa et Lubumbashi, la commune suit
 * la même logique — c'est ainsi qu'on y donne une adresse.
 *
 * Le point de repère est un champ à part entière, pas un détail : dans
 * beaucoup de quartiers, c'est lui qui permet de trouver la porte.
 */

const T = {
  ink: 'var(--pv-ink)',
  body: 'var(--pv-body)',
  muted: 'var(--pv-muted)',
  line: 'var(--pv-line)',
  surface: 'var(--pv-surface)',
  surfaceAlt: 'var(--pv-surface-alt)',
  accentDeep: 'var(--pv-accent-deep)',
  success: 'var(--pv-success)',
};

const EMPTY = {
  name: '',
  phone: '',
  country: 'CD',
  city: 'Kinshasa',
  commune: '',
  address: '',
  landmark: '',
  isDefault: false,
};

function Addresses() {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const [form, setForm] = useState(EMPTY);
  const [editing, setEditing] = useState(null);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const load = useCallback(async () => {
    try {
      setAddresses(await addressService.list());
      setError('');
    } catch (loadError) {
      setError(readApiError(loadError, 'Carnet indisponible.'));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  };

  const openEdit = address => {
    setEditing(address);
    setForm({
      ...EMPTY,
      ...address,
      /* Les adresses anciennes n'ont pas de pays : la RDC par défaut. */
      country: address.country || 'CD',
    });
    setOpen(true);
  };

  const update = key => event => {
    const value = event.target.value;

    setForm(current => {
      const next = { ...current, [key]: value };

      /* Changer de pays ou de ville invalide la commune choisie. */
      if (key === 'country') {
        next.city = citiesOf(value)[0]?.name || '';
        next.commune = '';
      }

      if (key === 'city') {
        next.commune = '';
      }

      return next;
    });
  };

  const submit = async event => {
    event.preventDefault();

    setError('');
    setSaving(true);

    try {
      if (editing) {
        await addressService.update(editing.id, form);
        setNotice('Adresse modifiée.');
      } else {
        await addressService.create(form);
        setNotice('Adresse ajoutée.');
      }

      setOpen(false);
      await load();
    } catch (saveError) {
      setError(readApiError(saveError, 'Enregistrement impossible.'));
    }

    setSaving(false);
  };

  const makeDefault = async address => {
    try {
      await addressService.update(address.id, { isDefault: true });
      setNotice('Adresse principale mise à jour.');
      await load();
    } catch (defaultError) {
      setError(readApiError(defaultError, 'Modification impossible.'));
    }
  };

  const remove = async () => {
    const target = confirmDelete;

    setConfirmDelete(null);

    try {
      await addressService.remove(target.id);
      setNotice('Adresse supprimée.');
      await load();
    } catch (deleteError) {
      setError(readApiError(deleteError, 'Suppression impossible.'));
    }
  };

  const cities = citiesOf(form.country);
  const communes = districtsOf(form.country, form.city);

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
            LIVRAISON
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: 34, md: 46 },
              fontWeight: 900,
              letterSpacing: '-.03em',
              color: '#fff',
              lineHeight: 1.05,
            }}
          >
            Mes adresses
          </Typography>

          <Typography sx={{ mt: 1.5, color: 'rgba(255,255,255,.68)', fontSize: { xs: 15, md: 17 } }}>
            Enregistrez vos lieux de livraison. Celui marqué comme principal
            sera proposé par défaut à chaque commande.
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
          <Collapse in={Boolean(error)}>
            <Alert severity="error" sx={{ borderRadius: '14px' }}>{error}</Alert>
          </Collapse>

          <Collapse in={Boolean(notice)}>
            <Alert
              severity="success"
              sx={{ borderRadius: '14px' }}
              onClose={() => setNotice('')}
            >
              {notice}
            </Alert>
          </Collapse>

          <Button
            variant="contained"
            size="large"
            startIcon={<AddRounded />}
            onClick={openCreate}
            sx={{ alignSelf: 'flex-start' }}
          >
            Ajouter une adresse
          </Button>

          {loading ? (
            <Typography sx={{ color: T.muted }}>Chargement…</Typography>
          ) : addresses.length === 0 ? (
            <Reveal>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: '20px',
                  border: `1px dashed ${T.line}`,
                  textAlign: 'center',
                }}
              >
                <HomeOutlined sx={{ fontSize: 40, color: T.muted }} />

                <Typography sx={{ mt: 1.5, fontWeight: 700, color: T.ink }}>
                  Aucune adresse enregistrée
                </Typography>

                <Typography sx={{ mt: 0.5, fontSize: 13.5, color: T.muted }}>
                  Ajoutez-en une pour commander sans tout retaper à chaque fois.
                </Typography>
              </Paper>
            </Reveal>
          ) : (
            <AnimatePresence initial={false}>
              {addresses.map((address, index) => (
                <Box
                  key={address.id}
                  component={motion.div}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      p: { xs: 2.2, md: 2.8 },
                      borderRadius: '20px',
                      border: `1px solid ${address.isDefault ? T.accentDeep : T.line}`,
                    }}
                  >
                    <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                      <PlaceOutlined sx={{ color: T.accentDeep, mt: 0.3 }} />

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ alignItems: 'center', flexWrap: 'wrap', mb: 0.5 }}
                        >
                          <Typography sx={{ fontWeight: 800, color: T.ink }}>
                            {address.name}
                          </Typography>

                          {address.isDefault ? (
                            <Chip
                              size="small"
                              icon={<CheckCircleRounded sx={{ fontSize: 15 }} />}
                              label="Principale"
                              sx={{
                                height: 24,
                                fontWeight: 700,
                                bgcolor: 'var(--pv-success-soft)',
                                color: T.success,
                              }}
                            />
                          ) : null}
                        </Stack>

                        <Typography sx={{ fontSize: 14, color: T.body }}>
                          {address.address}
                        </Typography>

                        <Typography sx={{ fontSize: 13.5, color: T.muted }}>
                          {[address.commune, address.city].filter(Boolean).join(', ')}
                        </Typography>

                        {address.landmark ? (
                          <Typography sx={{ mt: 0.6, fontSize: 13, color: T.muted, fontStyle: 'italic' }}>
                            Repère : {address.landmark}
                          </Typography>
                        ) : null}

                        <Typography sx={{ mt: 0.6, fontSize: 13.5, color: T.body }}>
                          {address.phone}
                        </Typography>

                        {!address.isDefault ? (
                          <Button
                            size="small"
                            onClick={() => makeDefault(address)}
                            sx={{ mt: 1, px: 0 }}
                          >
                            Définir comme principale
                          </Button>
                        ) : null}
                      </Box>

                      <Stack direction="row" spacing={0.5}>
                        <IconButton
                          onClick={() => openEdit(address)}
                          aria-label={`Modifier l'adresse ${address.name}`}
                        >
                          <EditRounded sx={{ fontSize: 20 }} />
                        </IconButton>

                        <IconButton
                          onClick={() => setConfirmDelete(address)}
                          aria-label={`Supprimer l'adresse ${address.name}`}
                        >
                          <DeleteOutlineRounded sx={{ fontSize: 20, color: 'var(--pv-error)' }} />
                        </IconButton>
                      </Stack>
                    </Stack>
                  </Paper>
                </Box>
              ))}
            </AnimatePresence>
          )}
        </Stack>
      </Container>

      {/* Formulaire */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        PaperProps={{ sx: { borderRadius: '22px' } }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>
          {editing ? 'Modifier l’adresse' : 'Nouvelle adresse'}
        </DialogTitle>

        <Box component="form" onSubmit={submit}>
          <DialogContent>
            <Stack spacing={2.2} sx={{ pt: 0.5 }}>
              <TextField
                fullWidth
                required
                label="Nom du destinataire"
                value={form.name}
                onChange={update('name')}
              />

              <TextField
                fullWidth
                required
                label="Téléphone"
                placeholder="0812345678"
                value={form.phone}
                onChange={update('phone')}
                helperText="Le livreur appellera ce numéro en arrivant."
              />

              <TextField
                select
                fullWidth
                label="Pays"
                value={form.country}
                onChange={update('country')}
              >
                {COUNTRIES.map(country => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.flag} {country.name}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                fullWidth
                required
                label="Ville"
                value={form.city}
                onChange={update('city')}
                helperText={provinceOf(form.country, form.city) || ' '}
              >
                {cities.map(city => (
                  <MenuItem key={city.name} value={city.name}>
                    {city.name}
                  </MenuItem>
                ))}
              </TextField>

              {/* Commune listée là où elle existe, libre ailleurs. */}
              {communes.length > 0 ? (
                <TextField
                  select
                  fullWidth
                  label="Commune"
                  value={form.commune}
                  onChange={update('commune')}
                >
                  <MenuItem value="">—</MenuItem>
                  {communes.map(commune => (
                    <MenuItem key={commune} value={commune}>
                      {commune}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  fullWidth
                  label="Quartier"
                  value={form.commune}
                  onChange={update('commune')}
                />
              )}

              <TextField
                fullWidth
                required
                label="Avenue, numéro"
                value={form.address}
                onChange={update('address')}
              />

              <TextField
                fullWidth
                label="Point de repère"
                value={form.landmark}
                onChange={update('landmark')}
                helperText="« Derrière la station Engen », « en face de l’école Saint-Joseph »."
              />
            </Stack>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={() => setOpen(false)}>Annuler</Button>

            <Button type="submit" variant="contained" disabled={saving}>
              {saving ? 'Enregistrement…' : editing ? 'Enregistrer' : 'Ajouter'}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Confirmation de suppression : une adresse se retrouve mal. */}
      <Dialog
        open={Boolean(confirmDelete)}
        onClose={() => setConfirmDelete(null)}
        PaperProps={{ sx: { borderRadius: '22px' } }}
      >
        <DialogTitle sx={{ fontWeight: 800 }}>Supprimer cette adresse ?</DialogTitle>

        <DialogContent>
          <Typography sx={{ color: T.body, fontSize: 14.5 }}>
            {confirmDelete?.name} — {confirmDelete?.address}
            {confirmDelete?.city ? `, ${confirmDelete.city}` : ''}
          </Typography>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2.5 }}>
          <Button onClick={() => setConfirmDelete(null)}>Annuler</Button>

          <Button onClick={remove} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Addresses;
