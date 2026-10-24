import React from 'react';

import {
  Box,
  Paper,
  Radio,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import ShieldOutlined from '@mui/icons-material/ShieldOutlined';
import KeyboardArrowRightRounded from '@mui/icons-material/KeyboardArrowRightRounded';
import CreditCardRounded from '@mui/icons-material/CreditCardRounded';
import PhoneIphoneRounded from '@mui/icons-material/PhoneIphoneRounded';

import airtelMoneyLogo from '../../assets/images/airtel-money-logo.png';
import mpesaLogo from '../../assets/images/m-pesa-logo.png';

const methods = [
  {
    id: 'card',
    title: 'Carte bancaire',
    description: 'Payez avec votre carte en toute sécurité',
    type: 'card',
  },
  {
    id: 'mpesa',
    title: 'Vodacom M-Pesa',
    description: 'Paiement mobile instantané',
    type: 'mobile',
    logo: mpesaLogo,
    logoAlt: 'M-Pesa',
  },
  {
    id: 'airtel',
    title: 'Airtel Money',
    description: 'Paiement mobile rapide et sécurisé',
    type: 'mobile',
    logo: airtelMoneyLogo,
    logoAlt: 'Airtel Money',
  },
  {
    id: 'orange',
    title: 'Orange Money',
    description: 'Payez directement depuis votre mobile',
    type: 'mobile',
    brand: {
      label: 'Orange',
      bg: '#ff7900',
    },
  },
];

function PaymentLogo({ type, logo, logoAlt, brand }) {
  /*
   * MOBILE LOGOS
   * Utilise directement les fichiers présents dans:
   * src/assets/image/
   */

  if (logo) {
    return (
      <Box
        sx={{
          width: 48,
          height: 32,
          borderRadius: '8px',
          bgcolor: 'var(--pv-surface)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          border: '1px solid var(--pv-line)',
        }}
      >
        <Box
          component="img"
          src={logo}
          alt={logoAlt}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            p: 0.4,
          }}
        />
      </Box>
    );
  }

  /*
   * ORANGE MONEY
   * On garde un logo visuel simple puisque tu ne m'as
   * pas donné de fichier orange-money-logo.
   */
  if (brand) {
    return (
      <Box
        sx={{
          width: 48,
          height: 32,
          borderRadius: '8px',
          bgcolor: brand.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
        }}
      >
        <Typography
          sx={{
            fontSize: '0.62rem',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            color: '#fff',
            whiteSpace: 'nowrap',
          }}
        >
          {brand.label}
        </Typography>
      </Box>
    );
  }

  /*
   * VISA
   */
  if (type === 'visa') {
    return (
      <Box
        sx={{
          width: 47,
          height: 30,
          borderRadius: '7px',
          bgcolor: 'var(--pv-surface)',
          border: '1px solid var(--pv-line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 3px 10px rgba(0,0,0,0.05)',
        }}
      >
        <Typography
          sx={{
            fontSize: '0.88rem',
            fontWeight: 950,
            fontStyle: 'italic',
            color: '#1a1f71',
            letterSpacing: '-0.04em',
          }}
        >
          VISA
        </Typography>
      </Box>
    );
  }

  return null;
}

function MastercardLogo() {
  return (
    <Box
      sx={{
        width: 47,
        height: 30,
        borderRadius: '7px',
        bgcolor: 'var(--pv-surface)',
        border: '1px solid var(--pv-line)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 28,
          height: 17,
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: 17,
            height: 17,
            borderRadius: '50%',
            bgcolor: '#eb001b',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: 17,
            height: 17,
            borderRadius: '50%',
            bgcolor: '#f79e1b',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            left: 5.5,
            top: 0,
            width: 17,
            height: 17,
            borderRadius: '50%',
            bgcolor: '#ff5f00',
            opacity: 0.9,
          }}
        />
      </Box>
    </Box>
  );
}

function PaymentMethod({
  value,
  onChange,
  cardData,
  onCardChange,
  mobilePhone,
  onMobilePhoneChange,
}) {
  const selectedMethod = methods.find(
    method => method.id === value,
  );

  const handleSelect = methodId => {
    if (typeof onChange === 'function') {
      onChange(methodId);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        animation: 'paymentMethodsEnter .45s ease both',
      }}
    >
      <Stack spacing={1.3}>
        {methods.map((method, index) => {
          const selected = value === method.id;

          return (
            <Paper
              key={method.id}
              elevation={0}
              onClick={() => handleSelect(method.id)}
              sx={{
                position: 'relative',
                p: {
                  xs: 1.4,
                  sm: 1.6,
                  md: 1.8,
                },
                cursor: 'pointer',
                borderRadius: {
                  xs: '17px',
                  md: '19px',
                },
                bgcolor: selected ? '#fff7fb' : 'var(--pv-surface)',
                border: selected
                  ? '1.5px solid rgba(236,72,153,0.45)'
                  : '1px solid var(--pv-line)',
                boxShadow: selected
                  ? '0 10px 30px rgba(236,72,153,0.09)'
                  : '0 5px 18px rgba(0,0,0,0.025)',
                transition:
                  'transform .22s ease, border-color .22s ease, box-shadow .22s ease',
                animation: 'paymentMethodEnter .4s ease both',
                animationDelay: `${index * 60}ms`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  borderColor: 'rgba(236,72,153,0.28)',
                  boxShadow: '0 10px 28px rgba(0,0,0,0.06)',
                },
              }}
            >
              {selected && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 13,
                    right: 13,
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: '#ec4899',
                    color: '#fff',
                    boxShadow:
                      '0 5px 12px rgba(236,72,153,0.22)',
                    zIndex: 2,
                  }}
                >
                  <CheckCircleRounded sx={{ fontSize: 17 }} />
                </Box>
              )}

              <Stack
                direction="row"
                spacing={{
                  xs: 1,
                  sm: 1.4,
                }}
                sx={{
                  alignItems: 'center',
                }}
              >
                <Radio
                  checked={selected}
                  onChange={() => handleSelect(method.id)}
                  value={method.id}
                  onClick={event => {
                    event.stopPropagation();
                    handleSelect(method.id);
                  }}
                  sx={{
                    p: 0.5,
                    color: '#d1d1d1',
                    '&.Mui-checked': {
                      color: '#ec4899',
                    },
                    '& .MuiSvgIcon-root': {
                      fontSize: 22,
                    },
                  }}
                />

                {/* LOGO */}
                <Box
                  sx={{
                    width: {
                      xs: 54,
                      sm: 60,
                    },
                    height: {
                      xs: 54,
                      sm: 60,
                    },
                    flexShrink: 0,
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: selected ? 'var(--pv-surface)' : 'var(--pv-surface-alt)',
                    border: '1px solid var(--pv-line)',
                    overflow: 'hidden',
                  }}
                >
                  {method.type === 'card' ? (
                    <PaymentLogo type="visa" />
                  ) : (
                    <PaymentLogo
                      logo={method.logo}
                      logoAlt={method.logoAlt}
                      brand={method.brand}
                    />
                  )}
                </Box>

                {/* TEXT */}
                <Box
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    pr: selected ? 3 : 0,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: {
                        xs: '0.78rem',
                        sm: '0.84rem',
                      },
                      fontWeight: 800,
                      color: 'var(--pv-ink)',
                    }}
                  >
                    {method.title}
                  </Typography>

                  <Typography
                    sx={{
                      mt: 0.45,
                      fontSize: {
                        xs: '0.65rem',
                        sm: '0.69rem',
                      },
                      fontWeight: 500,
                      color: 'var(--pv-muted)',
                      lineHeight: 1.5,
                    }}
                  >
                    {method.description}
                  </Typography>

                  {method.type === 'card' && (
                    <Stack
                      direction="row"
                      spacing={0.6}
                      sx={{
                        alignItems: 'center',
                        mt: 0.9,
                      }}
                    >
                      <PaymentLogo type="visa" />
                      <MastercardLogo />

                      <Typography
                        sx={{
                          fontSize: '0.58rem',
                          color: 'var(--pv-muted)',
                          fontWeight: 600,
                        }}
                      >
                        Cartes acceptées
                      </Typography>
                    </Stack>
                  )}
                </Box>

                <KeyboardArrowRightRounded
                  sx={{
                    display: {
                      xs: 'none',
                      sm: 'block',
                    },
                    color: selected ? '#ec4899' : '#c5c5c5',
                    fontSize: 21,
                  }}
                />
              </Stack>
            </Paper>
          );
        })}
      </Stack>

      {/* DETAILS DU PAIEMENT */}
      {selectedMethod && (
        <Box
          sx={{
            mt: 2.5,
            p: {
              xs: 2,
              sm: 2.5,
            },
            borderRadius: '18px',
            bgcolor: 'var(--pv-surface)',
            border: '1px solid rgba(236,72,153,0.15)',
            animation: 'paymentDetailsEnter .3s ease both',
          }}
        >
          {/* =========================
              CARTE BANCAIRE
          ========================== */}
          {value === 'card' && (
            <Stack spacing={2}>
              <Stack
                direction="row"
                spacing={1.2} sx={{ alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'var(--pv-accent-soft)',
                    color: '#db2777',
                  }}
                >
                  <CreditCardRounded />
                </Box>

                <Box>
                  <Typography
                    fontWeight={800}
                    fontSize="0.9rem"
                  >
                    Informations de la carte
                  </Typography>

                  <Typography
                    color="text.secondary"
                    fontSize="0.7rem"
                  >
                    Saisissez les informations de votre carte.
                  </Typography>
                </Box>
              </Stack>

              <TextField
                fullWidth
                label="Numéro de carte"
                placeholder="1234 5678 9012 3456"
                value={cardData?.cardNumber || ''}
                onChange={event => {
                  let nextValue = event.target.value
                    .replace(/\D/g, '')
                    .slice(0, 19);

                  nextValue =
                    nextValue
                      .match(/.{1,4}/g)
                      ?.join(' ') || '';

                  if (typeof onCardChange === 'function') {
                    onCardChange('cardNumber', nextValue);
                  }
                }}
                slotProps={{
                  htmlInput: {
                  inputMode: 'numeric',
                  maxLength: 23,
                },
                }}
              />

              <TextField
                fullWidth
                label="Nom sur la carte"
                placeholder="JOHN NDAYI"
                value={cardData?.cardName || ''}
                onChange={event => {
                  if (typeof onCardChange === 'function') {
                    onCardChange(
                      'cardName',
                      event.target.value.toUpperCase(),
                    );
                  }
                }}
              />

              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row',
                }}
                spacing={2}
              >
                <TextField
                  fullWidth
                  label="Expiration"
                  placeholder="MM/AA"
                  value={cardData?.expiry || ''}
                  onChange={event => {
                    let nextValue = event.target.value
                      .replace(/\D/g, '')
                      .slice(0, 4);

                    if (nextValue.length > 2) {
                      nextValue = `${nextValue.slice(
                        0,
                        2,
                      )}/${nextValue.slice(2)}`;
                    }

                    if (typeof onCardChange === 'function') {
                      onCardChange('expiry', nextValue);
                    }
                  }}
                slotProps={{
                  htmlInput: {
                    inputMode: 'numeric',
                    maxLength: 5,
                  },
                }}
              />

                <TextField
                  fullWidth
                  label="CVV"
                  placeholder="123"
                  type="password"
                  value={cardData?.cvv || ''}
                  onChange={event => {
                    if (typeof onCardChange === 'function') {
                      onCardChange(
                        'cvv',
                        event.target.value
                          .replace(/\D/g, '')
                          .slice(0, 4),
                      );
                    }
                  }}
                slotProps={{
                  htmlInput: {
                    inputMode: 'numeric',
                    maxLength: 4,
                  },
                }}
              />
              </Stack>

              <Box
                sx={{
                  p: 1.5,
                  borderRadius: '12px',
                  bgcolor: 'var(--pv-canvas)',
                  border: '1px solid var(--pv-line)',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.7rem',
                    color: 'var(--pv-muted)',
                    lineHeight: 1.6,
                  }}
                >
                  Après avoir rempli votre carte, cliquez sur
                  <strong> « Payer maintenant » </strong>
                  pour confirmer votre commande.
                </Typography>
              </Box>
            </Stack>
          )}

          {/* =========================
              MOBILE MONEY
          ========================== */}
          {value !== 'card' && (
            <Stack spacing={2}>
              <Stack
                direction="row"
                spacing={1.2} sx={{ alignItems: 'center' }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '11px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'var(--pv-accent-soft)',
                    color: '#db2777',
                  }}
                >
                  <PhoneIphoneRounded />
                </Box>

                <Box>
                  <Typography
                    fontWeight={800}
                    fontSize="0.9rem"
                  >
                    {selectedMethod.title}
                  </Typography>

                  <Typography
                    color="text.secondary"
                    fontSize="0.7rem"
                  >
                    Entrez le numéro utilisé pour ce paiement.
                  </Typography>
                </Box>
              </Stack>

              <TextField
                fullWidth
                label="Numéro de téléphone"
                placeholder="+243 8XX XXX XXX"
                value={mobilePhone || ''}
                onChange={event => {
                  if (
                    typeof onMobilePhoneChange === 'function'
                  ) {
                    onMobilePhoneChange(event.target.value);
                  }
                }}
                slotProps={{
                  htmlInput: {
                  inputMode: 'tel',
                },
                }}
              />

              <Box
                sx={{
                  p: 1.5,
                  borderRadius: '12px',
                  bgcolor: 'var(--pv-canvas)',
                  border: '1px solid var(--pv-line)',
                }}
              >
                <Typography
                  fontSize="0.7rem"
                  color="text.secondary"
                  sx={{ lineHeight: 1.6 }}
                >
                  Entrez votre numéro{' '}
                  <strong>{selectedMethod.title}</strong>.
                  Vous pourrez ensuite générer un QR code ou
                  payer directement.
                </Typography>
              </Box>
            </Stack>
          )}
        </Box>
      )}

      {/* SECURITE */}
      <Box
        sx={{
          mt: 2,
          p: 1.5,
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: 1.1,
          bgcolor: 'var(--pv-canvas)',
          border: '1px solid var(--pv-line)',
        }}
      >
        <Box
          sx={{
            width: 30,
            height: 30,
            flexShrink: 0,
            borderRadius: '9px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'var(--pv-success-soft)',
            color: 'var(--pv-success)',
          }}
        >
          <ShieldOutlined sx={{ fontSize: 16 }} />
        </Box>

        <Box>
          <Typography
            sx={{
              fontSize: '0.68rem',
              fontWeight: 750,
              color: 'var(--pv-body)',
            }}
          >
            Paiement sécurisé
          </Typography>

          <Typography
            sx={{
              mt: 0.15,
              fontSize: '0.62rem',
              color: 'var(--pv-muted)',
              fontWeight: 500,
            }}
          >
            Vos informations de paiement sont protégées.
          </Typography>
        </Box>
      </Box>

      <style>
        {`
          @keyframes paymentMethodsEnter {
            from {
              opacity: 0;
              transform: translateY(8px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes paymentMethodEnter {
            from {
              opacity: 0;
              transform: translateX(8px);
            }

            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @keyframes paymentDetailsEnter {
            from {
              opacity: 0;
              transform: translateY(6px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </Box>
  );
}

export default PaymentMethod;
