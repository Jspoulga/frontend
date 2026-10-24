import React, { useEffect, useRef, useState } from 'react';

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';

import CloudUploadOutlined from '@mui/icons-material/CloudUploadOutlined';
import DownloadRounded from '@mui/icons-material/DownloadRounded';
import InsertDriveFileOutlined from '@mui/icons-material/InsertDriveFileOutlined';
import TableChartOutlined from '@mui/icons-material/TableChartOutlined';
import WarningAmberRounded from '@mui/icons-material/WarningAmberRounded';

import adminService from '../../services/adminService';
import { readApiError } from '../../services/api';

const T = {
  ink: 'var(--pv-ink)',
  body: 'var(--pv-body)',
  muted: 'var(--pv-muted)',
  line: 'var(--pv-line)',
  accent: '#ec4899',
  accentDeep: 'var(--pv-accent-deep)',
};

const COLUMNS = [
  ['name', 'Nom du produit (obligatoire)'],
  ['price', 'Prix en francs congolais (obligatoire)'],
  ['category', 'Catégorie : Hommes, Femmes, Chaussures…'],
  ['oldPrice', 'Ancien prix, pour afficher une remise'],
  ['image', 'URL de la photo principale (https://…)'],
  ['images', 'Photos supplémentaires, séparées par |'],
  ['description', 'Texte affiché sur la fiche produit'],
  ['sizes', 'Tailles séparées par | (S|M|L)'],
  ['colors', 'Couleurs séparées par | (Noir|Blanc)'],
  ['stock', 'Quantité disponible (facultatif)'],
];

/*
 * Import du catalogue depuis un fichier CSV : c'est le point d'entrée pour
 * alimenter la boutique sans toucher au code. Les images restent hébergées où
 * le commerçant veut (Cloudinary, imgbb, GitHub…) : seule l'URL compte.
 */
function Catalogue() {
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [mode, setMode] = useState('replace');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [stats, setStats] = useState(null);

  useEffect(() => {
    adminService
      .stats()
      .then(setStats)
      .catch(() => setStats(null));
  }, [result]);

  const submit = async () => {
    if (!file) {
      return;
    }

    setBusy(true);
    setError('');
    setResult(null);

    try {
      setResult(await adminService.importProducts(file, mode));
      setFile(null);

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    } catch (importError) {
      const payload = importError?.response?.data;

      setError(readApiError(importError, "L'import a échoué."));
      setResult(payload?.errors ? { imported: 0, errors: payload.errors } : null);
    }

    setBusy(false);
  };

  const download = async () => {
    try {
      const blob = await adminService.exportProducts();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = 'products.csv';
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (downloadError) {
      setError(readApiError(downloadError, "L'export a échoué."));
    }
  };

  return (
    <Box>
      <Typography
        sx={{
          fontSize: { xs: '1.5rem', md: '1.9rem' },
          fontWeight: 700,
          letterSpacing: '-0.025em',
          color: T.ink,
        }}
      >
        Catalogue produits
      </Typography>

      <Typography sx={{ mt: 0.75, fontSize: '0.875rem', color: T.body, maxWidth: 620 }}>
        Mettez à jour toute la boutique en déposant un fichier CSV : prix,
        photos, tailles et couleurs. Aucune modification de code n'est
        nécessaire.
      </Typography>

      {stats && (
        <Stack direction="row" spacing={1.5} sx={{ mt: 2.5, flexWrap: 'wrap', gap: 1.5 }}>
          <StatChip label="Produits" value={stats.products} />
          <StatChip label="Catégories" value={stats.categories} />
          <StatChip label="Commandes" value={stats.orders} />
          <StatChip label="Clients" value={stats.customers} />
        </Stack>
      )}

      <Box
        sx={{
          mt: 3,
          display: 'grid',
          gap: 3,
          gridTemplateColumns: { xs: '1fr', lg: 'minmax(0, 1.3fr) minmax(280px, 0.7fr)' },
          alignItems: 'start',
        }}
      >
        <Paper elevation={0} sx={cardSx}>
          <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: T.ink, mb: 2 }}>
            Importer un fichier CSV
          </Typography>

          <ToggleButtonGroup
            exclusive
            value={mode}
            onChange={(_event, next) => next && setMode(next)}
            sx={{
              mb: 2.5,
              '& .MuiToggleButton-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.8rem',
                borderRadius: '12px !important',
                px: 2,
                border: `1px solid ${T.line} !important`,
              },
              '& .Mui-selected': {
                bgcolor: 'var(--pv-accent-soft) !important',
                color: `${T.accentDeep} !important`,
                borderColor: 'rgba(236,72,153,0.4) !important',
              },
            }}
          >
            <ToggleButton value="replace">Remplacer le catalogue</ToggleButton>
            <ToggleButton value="merge">Ajouter / mettre à jour</ToggleButton>
          </ToggleButtonGroup>

          <Typography sx={{ mb: 2, fontSize: '0.75rem', color: T.muted, lineHeight: 1.6 }}>
            {mode === 'replace'
              ? 'Le catalogue actuel est entièrement remplacé par le contenu du fichier.'
              : "Les produits du fichier sont ajoutés ; ceux qui existent déjà (même nom ou même identifiant) sont mis à jour."}
          </Typography>

          <Box
            component="label"
            sx={{
              display: 'block',
              p: 3,
              textAlign: 'center',
              cursor: 'pointer',
              borderRadius: '16px',
              border: `1.5px dashed ${file ? 'rgba(236,72,153,0.5)' : T.line}`,
              bgcolor: file ? '#fff7fb' : 'var(--pv-canvas)',
              transition: 'border-color .2s ease, background-color .2s ease',
              '&:hover': { borderColor: 'rgba(236,72,153,0.45)' },
            }}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".csv,text/csv"
              hidden
              onChange={event => {
                setFile(event.target.files?.[0] || null);
                setResult(null);
                setError('');
              }}
            />

            {file ? (
              <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
                <InsertDriveFileOutlined sx={{ fontSize: 30, color: T.accentDeep }} />
                <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: T.ink }}>
                  {file.name}
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: T.muted }}>
                  {(file.size / 1024).toFixed(1)} Ko — cliquez pour changer
                </Typography>
              </Stack>
            ) : (
              <Stack spacing={0.5} sx={{ alignItems: 'center' }}>
                <CloudUploadOutlined sx={{ fontSize: 30, color: T.muted }} />
                <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, color: T.ink }}>
                  Choisir un fichier CSV
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: T.muted }}>
                  Exporté depuis Excel ou Google Sheets, 2 Mo maximum
                </Typography>
              </Stack>
            )}
          </Box>

          <Stack direction="row" spacing={1.5} sx={{ mt: 2.5, flexWrap: 'wrap', gap: 1.5 }}>
            <Button
              variant="contained"
              disableElevation
              onClick={submit}
              disabled={!file || busy}
              startIcon={
                busy ? (
                  <CircularProgress size={16} sx={{ color: 'inherit' }} />
                ) : (
                  <CloudUploadOutlined />
                )
              }
              sx={{
                minHeight: 46,
                px: 2.5,
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.85rem',
                bgcolor: T.accentDeep,
                '&:hover': { bgcolor: '#9d174d' },
              }}
            >
              {busy ? 'Import en cours…' : 'Importer'}
            </Button>

            <Button
              onClick={download}
              startIcon={<DownloadRounded />}
              sx={{
                minHeight: 46,
                px: 2,
                borderRadius: '12px',
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                color: T.body,
                border: `1px solid ${T.line}`,
              }}
            >
              Exporter le catalogue
            </Button>
          </Stack>

          {busy && <LinearProgress sx={{ mt: 2, borderRadius: 2 }} />}

          {error && (
            <Alert severity="error" sx={{ mt: 2, borderRadius: '12px', fontSize: '0.82rem' }}>
              {error}
            </Alert>
          )}

          {result?.imported > 0 && (
            <Alert severity="success" sx={{ mt: 2, borderRadius: '12px', fontSize: '0.82rem' }}>
              {result.imported} produit{result.imported > 1 ? 's' : ''} importé
              {result.imported > 1 ? 's' : ''}
              {result.total ? ` — ${result.total} au catalogue.` : '.'}
            </Alert>
          )}

          {result?.errors?.length > 0 && (
            <Box
              sx={{
                mt: 2,
                p: 2,
                borderRadius: '12px',
                bgcolor: 'var(--pv-warning-soft)',
                border: '1px solid rgba(180,83,9,0.18)',
              }}
            >
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1 }}>
                <WarningAmberRounded sx={{ fontSize: 18, color: 'var(--pv-warning)' }} />
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: '#92400e' }}>
                  {result.errors.length} ligne
                  {result.errors.length > 1 ? 's' : ''} ignorée
                  {result.errors.length > 1 ? 's' : ''}
                </Typography>
              </Stack>

              <Stack spacing={0.5}>
                {result.errors.slice(0, 8).map(item => (
                  <Typography
                    key={`${item.line}-${item.message}`}
                    sx={{ fontSize: '0.75rem', color: '#92400e' }}
                  >
                    Ligne {item.line} — {item.message}
                  </Typography>
                ))}
              </Stack>
            </Box>
          )}
        </Paper>

        <Paper elevation={0} sx={cardSx}>
          <Stack direction="row" spacing={1.2} sx={{ alignItems: 'center', mb: 2 }}>
            <TableChartOutlined sx={{ fontSize: 20, color: T.accentDeep }} />
            <Typography sx={{ fontSize: '1rem', fontWeight: 700, color: T.ink }}>
              Colonnes du fichier
            </Typography>
          </Stack>

          <Stack spacing={1.25}>
            {COLUMNS.map(([name, help]) => (
              <Box key={name}>
                <Chip
                  label={name}
                  size="small"
                  sx={{
                    height: 22,
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    bgcolor: 'var(--pv-surface-alt)',
                    color: T.ink,
                  }}
                />

                <Typography sx={{ mt: 0.4, fontSize: '0.74rem', color: T.muted, lineHeight: 1.5 }}>
                  {help}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Typography sx={{ fontSize: '0.74rem', color: T.muted, lineHeight: 1.7 }}>
            Les photos ne sont pas hébergées ici : collez simplement l'URL
            publique de chaque image (Cloudinary, imgbb, Google Drive partagé,
            GitHub…). Toute adresse commençant par https:// fonctionne.
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
}

function StatChip({ label, value }) {
  return (
    <Box
      sx={{
        px: 2,
        py: 1.2,
        borderRadius: '14px',
        bgcolor: 'var(--pv-surface)',
        border: `1px solid ${T.line}`,
        minWidth: 110,
      }}
    >
      <Typography sx={{ fontSize: '1.2rem', fontWeight: 700, color: T.ink, lineHeight: 1.1 }}>
        {value}
      </Typography>

      <Typography sx={{ fontSize: '0.7rem', color: T.muted }}>{label}</Typography>
    </Box>
  );
}

const cardSx = {
  p: { xs: 2.5, md: 3 },
  borderRadius: '18px',
  bgcolor: 'var(--pv-surface)',
  border: `1px solid ${T.line}`,
  boxShadow: '0 1px 2px rgba(17,16,22,0.04), 0 10px 28px rgba(17,16,22,0.05)',
};

export default Catalogue;
