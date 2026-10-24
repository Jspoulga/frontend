import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { Link } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Chip,
  Collapse,
  Container,
  InputAdornment,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import {
  ArrowBackRounded,
  CheckCircleRounded,
  StraightenRounded,
} from '@mui/icons-material';

import api from '../../services/api';
import { readApiError } from '../../services/api';
import Reveal from '../../components/common/Reveal';

/*
 * ------------------------------------------------------------------
 * Le passeport de mesures
 * ------------------------------------------------------------------
 *
 * L'écran qui remplace le tableau de tailles. Le client y consigne ses
 * mensurations une fois ; chaque commande sur mesure s'en sert ensuite.
 *
 * Trois partis pris d'interface :
 *
 *   — on ne réclame jamais tout d'un coup. Le passeport se remplit par
 *     étapes, et l'écran dit ce qui manque *pour un vêtement donné* :
 *     « encore le tour de cou et votre chemise est commandable » ;
 *   — chaque champ porte son conseil de prise de mesure. Une mesure
 *     mal prise coûte une pièce gâchée ;
 *   — centimètres ou pouces au choix, mais la conversion se fait côté
 *     serveur : une seule unité dans la base.
 */

const T = {
  ink: 'var(--pv-ink)',
  body: 'var(--pv-body)',
  muted: 'var(--pv-muted)',
  line: 'var(--pv-line)',
  surface: 'var(--pv-surface)',
  surfaceAlt: 'var(--pv-surface-alt)',
  accent: 'var(--pv-accent)',
  accentDeep: 'var(--pv-accent-deep)',
  success: 'var(--pv-success)',
};

/* Groupes de saisie : on avance par zone du corps, pas par ordre alphabétique. */
const GROUPS = [
  {
    title: 'Silhouette',
    hint: 'Les trois mesures qui déterminent la coupe générale.',
    fields: [
      { key: 'height', label: 'Taille (hauteur)', tip: 'Debout, pieds nus, du sol au sommet du crâne.' },
      { key: 'chest', label: 'Tour de poitrine', tip: 'Au point le plus fort, bras le long du corps, sans serrer.' },
      { key: 'waist', label: 'Tour de taille', tip: 'Au creux naturel, au-dessus du nombril.' },
    ],
  },
  {
    title: 'Haut du corps',
    hint: 'Nécessaires pour une chemise ou une veste.',
    fields: [
      { key: 'shoulder', label: 'Carrure d’épaules', tip: 'D’une pointe d’épaule à l’autre, en passant par le dos.' },
      { key: 'sleeveLength', label: 'Longueur de manche', tip: 'De la pointe de l’épaule au poignet, bras légèrement plié.' },
      { key: 'armCircumference', label: 'Tour de bras', tip: 'Au point le plus fort du biceps, bras détendu.' },
      { key: 'neck', label: 'Tour de cou', tip: 'À la base du cou, en glissant un doigt sous le mètre.' },
      { key: 'backLength', label: 'Longueur du dos', tip: 'De la vertèbre saillante de la nuque jusqu’à la taille.' },
    ],
  },
  {
    title: 'Bas du corps',
    hint: 'Nécessaires pour un pantalon ou une robe.',
    fields: [
      { key: 'hips', label: 'Tour de hanches', tip: 'Au point le plus fort, environ 20 cm sous la taille.' },
      { key: 'inseam', label: 'Entrejambe', tip: 'De l’aine jusqu’à la cheville, à l’intérieur de la jambe.' },
      { key: 'thigh', label: 'Tour de cuisse', tip: 'Au point le plus fort, en haut de la cuisse.' },
    ],
  },
];

const FITS = [
  { value: 'ajuste', label: 'Ajusté', hint: 'Près du corps' },
  { value: 'normal', label: 'Normal', hint: 'Coupe classique' },
  { value: 'ample', label: 'Ample', hint: 'Confortable, décontracté' },
];

const GARMENT_LABELS = {
  chemise: 'Chemise',
  pantalon: 'Pantalon',
  robe: 'Robe',
  veste: 'Veste',
};

function Measurements() {
  const [passport, setPassport] = useState(null);
  const [values, setValues] = useState({});
  const [unit, setUnit] = useState('cm');
  const [fit, setFit] = useState('normal');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/users/me/measurements');

      setPassport(data);
      setFit(data.fit || 'normal');

      /* Le serveur stocke en centimètres ; l'affichage suit l'unité choisie. */
      setValues(
        Object.fromEntries(
          Object.entries(data.measurements || {}).map(([key, value]) => [key, String(value)]),
        ),
      );
    } catch (loadError) {
      setError(readApiError(loadError, 'Passeport indisponible.'));
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const update = key => event => {
    setValues(current => ({ ...current, [key]: event.target.value }));
    setFieldErrors(current => ({ ...current, [key]: undefined }));
    setSaved(false);
  };

  const submit = async event => {
    event.preventDefault();

    setError('');
    setFieldErrors({});
    setSaving(true);

    /* On n'envoie que ce qui est renseigné : un champ vide reste vide. */
    const payload = { unit, fit };

    for (const [key, value] of Object.entries(values)) {
      if (String(value).trim() !== '') {
        payload[key] = value;
      }
    }

    try {
      const { data } = await api.put('/users/me/measurements', payload);

      setPassport(data);
      setSaved(true);

      /* Après enregistrement, le serveur fait foi : il a converti et arrondi. */
      setValues(
        Object.fromEntries(
          Object.entries(data.measurements || {}).map(([key, value]) => [key, String(value)]),
        ),
      );
      setUnit('cm');
    } catch (saveError) {
      const details = saveError?.response?.data?.details;

      if (Array.isArray(details)) {
        /* Chaque mesure hors bornes est signalée sur son propre champ. */
        setFieldErrors(
          Object.fromEntries(
            details.map(item => [
              item.field,
              `Valeur attendue entre ${item.expected?.min} et ${item.expected?.max} cm.`,
            ]),
          ),
        );
        setError('Certaines mesures semblent erronées.');
      } else {
        setError(readApiError(saveError, 'Enregistrement impossible.'));
      }
    }

    setSaving(false);
  };

  /*
   * Mémorisé sur `passport` plutôt que sur le tableau : un repli `|| []`
   * crée un nouveau tableau à chaque rendu, ce qui relancerait le calcul
   * sans fin.
   */
  const readiness = useMemo(() => passport?.readiness || [], [passport]);

  const ready = useMemo(() => readiness.filter(item => item.ready), [readiness]);

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
            sx={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: '.18em',
              color: '#f472b6',
              mb: 1,
            }}
          >
            SUR MESURE
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
            Mon passeport de mesures
          </Typography>

          <Typography sx={{ mt: 1.5, color: 'rgba(255,255,255,.68)', fontSize: { xs: 15, md: 17 } }}>
            Renseignez vos mensurations une seule fois. Chaque pièce sera
            ensuite cousue à vos dimensions — plus de taille approximative,
            plus de retour.
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
        <Stack spacing={{ xs: 2, md: 3 }}>
          {/* Avancement et vêtements commandables */}
          <Reveal>
            <Paper
              elevation={0}
              sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '20px', border: `1px solid ${T.line}` }}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 2 }}>
                <StraightenRounded sx={{ color: T.accentDeep }} />

                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 800, color: T.ink }}>
                    Passeport complété à {passport?.completeness ?? 0} %
                  </Typography>

                  <Typography sx={{ fontSize: 13, color: T.muted }}>
                    {ready.length > 0
                      ? `Vous pouvez déjà commander : ${ready
                          .map(item => GARMENT_LABELS[item.garment] || item.garment)
                          .join(', ')}.`
                      : 'Renseignez vos mesures pour débloquer vos premières pièces.'}
                  </Typography>
                </Box>
              </Stack>

              <LinearProgress
                variant="determinate"
                value={passport?.completeness ?? 0}
                sx={{
                  height: 8,
                  borderRadius: 999,
                  bgcolor: T.surfaceAlt,
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 999,
                    background: 'linear-gradient(90deg, #EC4899, #A855F7)',
                  },
                }}
              />

              {/*
                Ce qui manque, vêtement par vêtement. C'est plus utile
                qu'un pourcentage : on sait quoi mesurer ensuite, et pourquoi.
              */}
              <Stack spacing={1} sx={{ mt: 2.5 }}>
                {readiness.map(item => (
                  <Stack
                    key={item.garment}
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'center', flexWrap: 'wrap' }}
                  >
                    {item.ready ? (
                      <CheckCircleRounded sx={{ fontSize: 18, color: T.success }} />
                    ) : (
                      <Box
                        sx={{
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          border: `2px solid ${T.line}`,
                          flexShrink: 0,
                        }}
                      />
                    )}

                    <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: T.ink, minWidth: 82 }}>
                      {GARMENT_LABELS[item.garment] || item.garment}
                    </Typography>

                    <Typography sx={{ fontSize: 13, color: T.muted }}>
                      {item.ready
                        ? 'commandable'
                        : `manque ${item.missing.map(field => field.label.toLowerCase()).join(', ')}`}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Paper>
          </Reveal>

          {/* Saisie */}
          <Reveal index={1}>
            <Paper
              elevation={0}
              component="form"
              onSubmit={submit}
              sx={{ p: { xs: 2.5, md: 3 }, borderRadius: '20px', border: `1px solid ${T.line}` }}
            >
              <Collapse in={Boolean(error)}>
                <Alert severity="error" sx={{ mb: 2.5, borderRadius: '14px', fontSize: '0.85rem' }}>
                  {error}
                </Alert>
              </Collapse>

              <Collapse in={saved}>
                <Alert severity="success" sx={{ mb: 2.5, borderRadius: '14px', fontSize: '0.85rem' }}>
                  Passeport enregistré.
                </Alert>
              </Collapse>

              <Stack
                direction="row"
                spacing={1.5}
                sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 3, flexWrap: 'wrap' }}
              >
                <Typography sx={{ fontWeight: 800, color: T.ink }}>Vos mesures</Typography>

                <ToggleButtonGroup
                  size="small"
                  exclusive
                  value={unit}
                  onChange={(_event, next) => next && setUnit(next)}
                >
                  <ToggleButton value="cm" sx={{ px: 2 }}>cm</ToggleButton>
                  <ToggleButton value="in" sx={{ px: 2 }}>pouces</ToggleButton>
                </ToggleButtonGroup>
              </Stack>

              <Stack spacing={3.5} sx={{ maxWidth: 520 }}>
                {GROUPS.map(group => (
                  <Box key={group.title}>
                    <Typography sx={{ fontWeight: 700, color: T.ink, fontSize: 14.5 }}>
                      {group.title}
                    </Typography>

                    <Typography sx={{ fontSize: 12.5, color: T.muted, mb: 1.8 }}>
                      {group.hint}
                    </Typography>

                    <Stack spacing={2.2}>
                      {group.fields.map(field => (
                        <TextField
                          key={field.key}
                          fullWidth
                          label={field.label}
                          value={values[field.key] ?? ''}
                          onChange={update(field.key)}
                          error={Boolean(fieldErrors[field.key])}
                          helperText={fieldErrors[field.key] || field.tip}
                          inputProps={{ inputMode: 'decimal' }}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <Typography sx={{ fontSize: 13, color: T.muted }}>
                                  {unit}
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                      ))}
                    </Stack>
                  </Box>
                ))}

                <Box>
                  <Typography sx={{ fontWeight: 700, color: T.ink, fontSize: 14.5 }}>
                    Aisance souhaitée
                  </Typography>

                  <Typography sx={{ fontSize: 12.5, color: T.muted, mb: 1.5 }}>
                    Les mêmes mesures donnent trois vêtements différents.
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {FITS.map(option => (
                      <Chip
                        key={option.value}
                        label={option.label}
                        onClick={() => { setFit(option.value); setSaved(false); }}
                        sx={{
                          height: 38,
                          px: 1,
                          fontWeight: 700,
                          borderRadius: 999,
                          bgcolor: fit === option.value ? 'var(--pv-band)' : T.surfaceAlt,
                          color: fit === option.value ? '#fff' : T.body,
                          border: `1px solid ${fit === option.value ? 'var(--pv-band)' : T.line}`,
                        }}
                      />
                    ))}
                  </Stack>
                </Box>

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={saving || loading}
                >
                  {saving ? 'Enregistrement…' : 'Enregistrer mon passeport'}
                </Button>
              </Stack>
            </Paper>
          </Reveal>

          {/* Pourquoi c'est demandé */}
          <Reveal index={2}>
            <Paper
              elevation={0}
              sx={{
                p: { xs: 2.5, md: 3 },
                borderRadius: '20px',
                bgcolor: T.surfaceAlt,
                border: `1px solid ${T.line}`,
              }}
            >
              <Typography sx={{ fontWeight: 700, color: T.ink, fontSize: 14 }}>
                Pourquoi vos mesures ?
              </Typography>

              <Typography sx={{ mt: 0.8, fontSize: 13.5, color: T.body, lineHeight: 1.6 }}>
                Vos pièces ne sont pas prises dans un stock : elles sont coupées
                après votre commande, à vos dimensions, par un atelier proche de
                chez vous. C'est ce qui supprime la taille qui ne va pas — et le
                retour qui va avec. Vos mesures ne servent qu'à cela.
              </Typography>
            </Paper>
          </Reveal>
        </Stack>
      </Container>
    </Box>
  );
}

export default Measurements;
