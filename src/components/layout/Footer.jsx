import React from 'react';

import {
  Box,
  Container,
  Typography,
  Stack,
  Link,
  Divider,
  TextField,
  Button,
  IconButton,
} from '@mui/material';

import {
  Instagram,
  Facebook,
  Twitter,
  EmailOutlined,
  PhoneOutlined,
  LocationOnOutlined,
  ArrowForward,
} from '@mui/icons-material';

import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        mt: 12,
        background: '#0D0D0D',
        color: '#fff',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          pt: {
            xs: 6,
            md: 8,
          },
          pb: 3,
        }}
      >
        {/* NEWSLETTER */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            alignItems: {
              xs: 'flex-start',
              md: 'center',
            },
            justifyContent: 'space-between',
            gap: 4,
            pb: 7,
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: {
                  xs: 25,
                  md: 30,
                },
                fontWeight: 800,
                letterSpacing: '-0.8px',
              }}
            >
              Restez dans le style.
            </Typography>

            <Typography
              sx={{
                mt: 1,
                color: 'var(--pv-muted)',
                fontSize: 14,
              }}
            >
              Recevez nos nouveautés, offres et
              collections directement par email.
            </Typography>
          </Box>

          <Box
            component="form"
            sx={{
              display: 'flex',
              width: {
                xs: '100%',
                sm: 430,
              },
              height: 50,
              background: '#181818',
              border: '1px solid var(--pv-ink)',
              borderRadius: '12px',
              overflow: 'hidden',
            }}
          >
            <TextField
              fullWidth
              placeholder="Votre adresse email"
              variant="standard"
             
              sx={{
                px: 2,
                display: 'flex',
                justifyContent: 'center',

                '& input': {
                  color: '#fff',
                  fontSize: 14,
                },

                '& input::placeholder': {
                  color: 'var(--pv-muted)',
                  opacity: 1,
                },
              }}
          slotProps={{
            input: {
                disableUnderline: true,
              },
          }}
        />

            <Button
              type="submit"
              sx={{
                minWidth: 55,
                px: 2,
                background: '#C2185B',
                color: '#fff',
                borderRadius: 0,

                '&:hover': {
                  background: '#AD1457',
                },
              }}
            >
              <ArrowForward />
            </Button>
          </Box>
        </Box>

        <Divider
          sx={{
            borderColor: 'var(--pv-ink)',
          }}
        />

        {/* MAIN FOOTER */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 1fr',
              md: '2fr 1fr 1fr 1.4fr',
            },
            gap: {
              xs: 5,
              md: 8,
            },
            py: 7,
          }}
        >
          {/* BRAND */}
          <Box>
            <Box
              component={RouterLink}
              to="/"
              sx={{
                display: 'inline-flex',
                textDecoration: 'none',
                mb: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: '#fff',
                  letterSpacing: '-1.5px',
                }}
              >
                Pivot
              </Typography>

              <Typography
                sx={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: '#C2185B',
                  letterSpacing: '-1.5px',
                }}
              >
                Store
              </Typography>
            </Box>

            <Typography
              sx={{
                color: 'var(--pv-muted)',
                lineHeight: 1.8,
                maxWidth: 330,
                fontSize: 14,
              }}
            >
              Découvrez une sélection de vêtements
              modernes et tendance, pensée pour
              votre style au quotidien.
            </Typography>

            {/* SOCIALS */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 3 }}
            >
              <IconButton
                sx={{
                  width: 40,
                  height: 40,
                  color: 'var(--pv-muted)',
                  border: '1px solid var(--pv-ink)',
                  borderRadius: '10px',

                  '&:hover': {
                    color: '#fff',
                    background: 'var(--pv-ink)',
                    borderColor: 'var(--pv-body)',
                  },
                }}
              >
                <Instagram fontSize="small" />
              </IconButton>

              <IconButton
                sx={{
                  width: 40,
                  height: 40,
                  color: 'var(--pv-muted)',
                  border: '1px solid var(--pv-ink)',
                  borderRadius: '10px',

                  '&:hover': {
                    color: '#fff',
                    background: 'var(--pv-ink)',
                    borderColor: 'var(--pv-body)',
                  },
                }}
              >
                <Facebook fontSize="small" />
              </IconButton>

              <IconButton
                sx={{
                  width: 40,
                  height: 40,
                  color: 'var(--pv-muted)',
                  border: '1px solid var(--pv-ink)',
                  borderRadius: '10px',

                  '&:hover': {
                    color: '#fff',
                    background: 'var(--pv-ink)',
                    borderColor: 'var(--pv-body)',
                  },
                }}
              >
                <Twitter fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          {/* BOUTIQUE */}
          <Box>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1,
                mb: 2.5,
                color: '#fff',
              }}
            >
              Boutique
            </Typography>

            <Stack spacing={1.5}>
              <Link
                component={RouterLink}
                to="/shop"
                underline="none"
                sx={{
                  color: 'var(--pv-muted)',
                  fontSize: 14,
                  transition: '0.2s',

                  '&:hover': {
                    color: '#fff',
                    transform: 'translateX(3px)',
                  },
                }}
              >
                Tous les produits
              </Link>

              <Link
                component={RouterLink}
                to="/category/Hommes"
                underline="none"
                sx={{
                  color: 'var(--pv-muted)',
                  fontSize: 14,
                  transition: '0.2s',

                  '&:hover': {
                    color: '#fff',
                    transform: 'translateX(3px)',
                  },
                }}
              >
                Hommes
              </Link>

              <Link
                component={RouterLink}
                to="/category/Femmes"
                underline="none"
                sx={{
                  color: 'var(--pv-muted)',
                  fontSize: 14,
                  transition: '0.2s',

                  '&:hover': {
                    color: '#fff',
                    transform: 'translateX(3px)',
                  },
                }}
              >
                Femmes
              </Link>

              <Link
                component={RouterLink}
                to="/shop?sort=newest"
                underline="none"
                sx={{
                  color: 'var(--pv-muted)',
                  fontSize: 14,
                  transition: '0.2s',

                  '&:hover': {
                    color: '#fff',
                    transform: 'translateX(3px)',
                  },
                }}
              >
                Nouveautés
              </Link>
            </Stack>
          </Box>

          {/* SERVICE */}
          <Box>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1,
                mb: 2.5,
              }}
            >
              Services
            </Typography>

            <Stack spacing={1.5}>
              <Typography
                sx={{
                  color: 'var(--pv-muted)',
                  fontSize: 14,
                }}
              >
                Livraison en RDC
              </Typography>

              <Typography
                sx={{
                  color: 'var(--pv-muted)',
                  fontSize: 14,
                }}
              >
                Paiement sécurisé
              </Typography>

              <Typography
                sx={{
                  color: 'var(--pv-muted)',
                  fontSize: 14,
                }}
              >
                Retours & échanges
              </Typography>

              <Typography
                sx={{
                  color: 'var(--pv-muted)',
                  fontSize: 14,
                }}
              >
                Support client
              </Typography>
            </Stack>
          </Box>

          {/* CONTACT */}
          <Box>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 1,
                mb: 2.5,
              }}
            >
              Contact
            </Typography>

            <Stack spacing={2}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 1.5,
                }}
              >
                <LocationOnOutlined
                  sx={{
                    fontSize: 19,
                    color: '#C2185B',
                  }}
                />

                <Typography
                  sx={{
                    color: 'var(--pv-muted)',
                    fontSize: 14,
                    lineHeight: 1.5,
                  }}
                >
                  République
                  <br />
                  Démocratique du Congo
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <PhoneOutlined
                  sx={{
                    fontSize: 18,
                    color: '#C2185B',
                  }}
                />

                <Typography
                  sx={{
                    color: 'var(--pv-muted)',
                    fontSize: 14,
                  }}
                >
                  +243 XXX XXX XXX
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <EmailOutlined
                  sx={{
                    fontSize: 18,
                    color: '#C2185B',
                  }}
                />

                <Typography
                  sx={{
                    color: 'var(--pv-muted)',
                    fontSize: 14,
                  }}
                >
                  contact@kinstyle.com
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>

        {/* BOTTOM */}
        <Divider
          sx={{
            borderColor: 'var(--pv-ink)',
          }}
        />

        <Box
          sx={{
            py: 3,
            display: 'flex',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
            justifyContent: 'space-between',
            alignItems: {
              xs: 'flex-start',
              md: 'center',
            },
            gap: 2,
          }}
        >
          <Typography
            sx={{
              color: 'var(--pv-body)',
              fontSize: 12.5,
            }}
          >
            © {new Date().getFullYear()} Pivot Store.
            Tous droits réservés.
          </Typography>

          <Stack
            direction="row"
            spacing={3}
          >
            <Link
              href="#"
              underline="none"
              sx={{
                color: 'var(--pv-body)',
                fontSize: 12.5,

                '&:hover': {
                  color: '#fff',
                },
              }}
            >
              Politique de confidentialité
            </Link>

            <Link
              href="#"
              underline="none"
              sx={{
                color: 'var(--pv-body)',
                fontSize: 12.5,

                '&:hover': {
                  color: '#fff',
                },
              }}
            >
              Conditions
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;