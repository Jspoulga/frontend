import React from 'react';

import {
  Box,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';

import PersonOutlineRounded from '@mui/icons-material/PersonOutlineRounded';
import LocationOnOutlined from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlined from '@mui/icons-material/PhoneOutlined';
import HomeOutlined from '@mui/icons-material/HomeOutlined';
import LockOutlined from '@mui/icons-material/LockOutlined';

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    minHeight: 56,
    borderRadius: '15px',
    bgcolor: 'var(--pv-surface)',
    transition: 'border-color .25s ease, box-shadow .25s ease',

    '& fieldset': {
      borderColor: 'rgba(0,0,0,0.09)',
      transition: 'border-color .25s ease',
    },

    '&:hover fieldset': { borderColor: 'rgba(236,72,153,0.35)' },

    '&.Mui-focused': { boxShadow: '0 0 0 4px rgba(236,72,153,0.08)' },
    '&.Mui-focused fieldset': { borderColor: '#ec4899', borderWidth: 1 },

    '&.Mui-error fieldset': { borderColor: 'var(--pv-error)' },
    '&.Mui-error.Mui-focused': { boxShadow: '0 0 0 4px rgba(220,38,38,0.08)' },

    '& input, & textarea': {
      fontSize: '0.86rem',
      fontWeight: 500,
      color: 'var(--pv-ink)',
    },
  },

  '& .MuiInputLabel-root': {
    fontSize: '0.82rem',
    fontWeight: 600,
    color: 'var(--pv-muted)',
    '&.Mui-focused': { color: '#db2777' },
    '&.Mui-error': { color: 'var(--pv-error)' },
  },

  '& .MuiFormHelperText-root': {
    fontSize: '0.7rem',
    marginLeft: '6px',
  },

  '& .MuiInputAdornment-root': { mr: 0.5 },
};

function FieldIcon({ children }) {
  return (
    <Box
      sx={{
        width: 30,
        height: 30,
        borderRadius: '9px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'var(--pv-accent-soft)',
        color: '#ec4899',
        border: '1px solid rgba(236,72,153,0.08)',
      }}
    >
      {children}
    </Box>
  );
}

/*
 * Les champs sont contrôlés par le parent (Checkout) : sans `data` / `setData`
 * la saisie n'arrivait jamais dans l'état de la commande, et la validation
 * refusait systématiquement le paiement.
 */
const FIELDS = [
  {
    key: 'name',
    label: 'Nom complet',
    placeholder: 'Ex. Marie Kabongo',
    autoComplete: 'name',
    icon: PersonOutlineRounded,
    size: { xs: 12, sm: 6 },
  },
  {
    key: 'phone',
    label: 'Téléphone',
    placeholder: '+243 812 345 678',
    autoComplete: 'tel',
    type: 'tel',
    icon: PhoneOutlined,
    size: { xs: 12, sm: 6 },
    helper: 'Le numéro qui recevra la demande de paiement mobile.',
  },
  {
    key: 'address',
    label: 'Adresse',
    placeholder: 'Ex. 12, avenue de la Paix',
    autoComplete: 'street-address',
    icon: LocationOnOutlined,
    size: { xs: 12 },
  },
  {
    key: 'city',
    label: 'Ville',
    placeholder: 'Kinshasa',
    autoComplete: 'address-level2',
    icon: HomeOutlined,
    size: { xs: 12, sm: 6 },
  },
  {
    key: 'commune',
    label: 'Commune',
    placeholder: 'Ex. Gombe',
    autoComplete: 'address-level3',
    icon: HomeOutlined,
    size: { xs: 12, sm: 6 },
  },
];

export default function AddressForm({
  address = {},
  onChange,
  errors = {},
}) {
  const handleChange = key => event => {
    const { value } = event.target;

    if (typeof onChange === 'function') {
      onChange(key, value);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.2 }}>
        {FIELDS.map(field => {
          const Icon = field.icon;
          const fieldError = errors[field.key];

          return (
            /* MUI 9 : le Grid utilise `size`, plus `item` + `xs`/`sm`. */
            <Grid key={field.key} size={field.size}>
              <TextField
                fullWidth
                label={field.label}
                placeholder={field.placeholder}
                autoComplete={field.autoComplete}
                type={field.type || 'text'}
                value={address[field.key] || ''}
                onChange={handleChange(field.key)}
                error={Boolean(fieldError)}
                helperText={fieldError || field.helper || ' '}
                variant="outlined"
                sx={fieldSx}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <FieldIcon>
                          <Icon sx={{ fontSize: 17 }} />
                        </FieldIcon>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Grid>
          );
        })}
      </Grid>

      <Box
        sx={{
          mt: 1.5,
          p: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 1.2,
          borderRadius: '14px',
          bgcolor: 'var(--pv-canvas)',
          border: '1px solid var(--pv-line)',
        }}
      >
        <LockOutlined sx={{ fontSize: 18, color: 'var(--pv-success)', flexShrink: 0 }} />

        <Typography sx={{ fontSize: '0.68rem', color: 'var(--pv-muted)', lineHeight: 1.5 }}>
          Votre adresse ne sert qu'à la livraison de cette commande.
        </Typography>
      </Box>
    </Box>
  );
}
