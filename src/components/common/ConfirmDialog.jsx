import React from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from '@mui/material';

import WarningAmberRounded from '@mui/icons-material/WarningAmberRounded';
import CloseRounded from '@mui/icons-material/CloseRounded';
import CheckRounded from '@mui/icons-material/CheckRounded';

function ConfirmDialog({
  open,
  title = 'Confirmation',
  message = 'Êtes-vous sûr ?',
  onClose,
  onConfirm,
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      slotProps={{
        paper: {
        {
        sx: {
          width: '100%',
          borderRadius: {
            xs: '22px',
            sm: '26px',
          },
          overflow: 'hidden',
          bgcolor: 'var(--pv-surface)',
          border: '1px solid var(--pv-line)',
          boxShadow:
            '0 30px 80px rgba(0,0,0,0.18)',
          animation:
            'confirmDialogEnter .3s ease both',
        },
      }
        },
        backdrop: {
          sx: {
            backgroundColor: 'rgba(10,10,10,0.58)',
            backdropFilter: 'blur(6px)',
          },
        },
      }}
    >
      {/* Header */}
      <DialogTitle
        id="confirm-dialog-title"
        sx={{
          px: {
            xs: 2.5,
            sm: 3,
          },
          pt: {
            xs: 2.5,
            sm: 3,
          },
          pb: 1.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
            }}
          >
            {/* Icon */}
            <Box
              sx={{
                width: 46,
                height: 46,
                flexShrink: 0,
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: '#fff1f2',
                color: '#e11d48',
                border:
                  '1px solid rgba(225,29,72,0.08)',
              }}
            >
              <WarningAmberRounded
                sx={{
                  fontSize: 24,
                }}
              />
            </Box>

            <Box>
              <Typography
                sx={{
                  fontSize: {
                    xs: '0.98rem',
                    sm: '1.05rem',
                  },
                  fontWeight: 850,
                  color: 'var(--pv-ink)',
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                }}
              >
                {title}
              </Typography>

              <Typography
                sx={{
                  mt: 0.35,
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  color: 'var(--pv-muted)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.07em',
                }}
              >
                Action à confirmer
              </Typography>
            </Box>
          </Box>

          {/* Close */}
          <Box
            component="button"
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            sx={{
              width: 34,
              height: 34,
              flexShrink: 0,
              p: 0,
              border: 0,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'var(--pv-surface-alt)',
              color: 'var(--pv-muted)',
              cursor: 'pointer',
              transition:
                'background .2s ease, color .2s ease, transform .2s ease',

              '&:hover': {
                bgcolor: 'var(--pv-band)',
                color: '#fff',
                transform: 'rotate(4deg)',
              },
            }}
          >
            <CloseRounded
              sx={{
                fontSize: 18,
              }}
            />
          </Box>
        </Box>
      </DialogTitle>

      <Divider
        sx={{
          borderColor: 'rgba(0,0,0,0.055)',
        }}
      />

      {/* Message */}
      <DialogContent
        sx={{
          px: {
            xs: 2.5,
            sm: 3,
          },
          py: {
            xs: 2.5,
            sm: 3,
          },
        }}
      >
        <Box
          sx={{
            p: {
              xs: 1.8,
              sm: 2,
            },
            borderRadius: '15px',
            bgcolor: 'var(--pv-surface-alt)',
            border:
              '1px solid var(--pv-line)',
          }}
        >
          <Typography
            id="confirm-dialog-description"
            sx={{
              fontSize: {
                xs: '0.82rem',
                sm: '0.86rem',
              },
              lineHeight: 1.7,
              color: 'var(--pv-body)',
              fontWeight: 500,
            }}
          >
            {message}
          </Typography>
        </Box>

        <Typography
          sx={{
            mt: 1.5,
            px: 0.2,
            fontSize: '0.68rem',
            lineHeight: 1.5,
            color: 'var(--pv-muted)',
          }}
        >
          Cette action peut être définitive. Vérifiez
          les informations avant de continuer.
        </Typography>
      </DialogContent>

      <Divider
        sx={{
          borderColor: 'rgba(0,0,0,0.055)',
        }}
      />

      {/* Actions */}
      <DialogActions
        sx={{
          px: {
            xs: 2.5,
            sm: 3,
          },
          py: {
            xs: 2,
            sm: 2.2,
          },
          gap: 1,
          flexDirection: {
            xs: 'column-reverse',
            sm: 'row',
          },
          justifyContent: 'flex-end',
        }}
      >
        <Button
          onClick={onClose}
          startIcon={
            <CloseRounded
              sx={{
                fontSize: '17px !important',
              }}
            />
          }
          fullWidth
          sx={{
            minHeight: 46,
            px: 2,
            borderRadius: '13px',
            textTransform: 'none',
            fontSize: '0.78rem',
            fontWeight: 750,
            color: 'var(--pv-body)',
            bgcolor: 'var(--pv-surface-alt)',
            border:
              '1px solid var(--pv-line)',

            '&:hover': {
              bgcolor: '#ededee',
              color: 'var(--pv-ink)',
            },

            '@media (min-width:600px)': {
              width: 'auto',
            },
          }}
        >
          Annuler
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          fullWidth
          startIcon={
            <CheckRounded
              sx={{
                fontSize: '18px !important',
              }}
            />
          }
          sx={{
            minHeight: 46,
            px: 2.2,
            borderRadius: '13px',
            textTransform: 'none',
            fontSize: '0.78rem',
            fontWeight: 800,

            bgcolor: 'var(--pv-band)',
            color: '#fff',

            boxShadow:
              '0 8px 20px rgba(0,0,0,0.12)',

            transition:
              'transform .2s ease, box-shadow .2s ease, background .2s ease',

            '&:hover': {
              bgcolor: '#e11d48',
              boxShadow:
                '0 10px 25px rgba(225,29,72,0.22)',
              transform: 'translateY(-1px)',
            },

            '@media (min-width:600px)': {
              width: 'auto',
            },
          }}
        >
          Confirmer
        </Button>
      </DialogActions>

      <style>
        {`
          @keyframes confirmDialogEnter {
            from {
              opacity: 0;
              transform: translateY(10px) scale(0.98);
            }

            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }

          @media (prefers-reduced-motion: reduce) {
            * {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
            }
          }
        `}
      </style>
    </Dialog>
  );
}

export default ConfirmDialog;