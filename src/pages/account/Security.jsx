import React from 'react';

import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  ArrowBackRounded,
  CheckCircleRounded,
  LockOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
  ShieldOutlined,
  KeyOutlined,
  SecurityRounded,
  WarningAmberRounded,
} from '@mui/icons-material';

import { Link } from 'react-router-dom';


function Security() {
  const [oldPassword, setOldPassword] =
    React.useState('');

  const [newPassword, setNewPassword] =
    React.useState('');

  const [confirmPassword, setConfirmPassword] =
    React.useState('');

  const [showOld, setShowOld] =
    React.useState(false);

  const [showNew, setShowNew] =
    React.useState(false);

  const [showConfirm, setShowConfirm] =
    React.useState(false);

  const [saved, setSaved] =
    React.useState(false);

  const [error, setError] =
    React.useState('');

  const getPasswordStrength = password => {
    if (!password) {
      return {
        label: 'Aucun mot de passe',
        value: 0,
        color: 'var(--pv-muted)',
      };
    }

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) {
      return {
        label: 'Faible',
        value: 25,
        color: '#ef4444',
      };
    }

    if (score === 2) {
      return {
        label: 'Moyen',
        value: 50,
        color: '#f59e0b',
      };
    }

    if (score === 3) {
      return {
        label: 'Bon',
        value: 75,
        color: '#84cc16',
      };
    }

    return {
      label: 'Excellent',
      value: 100,
      color: 'var(--pv-success)',
    };
  };

  const strength =
    getPasswordStrength(newPassword);

  const handleSubmit = () => {
    setError('');
    setSaved(false);

    if (
      !oldPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setError(
        'Veuillez remplir tous les champs.'
      );
      return;
    }

    if (newPassword.length < 8) {
      setError(
        'Le nouveau mot de passe doit contenir au moins 8 caractères.'
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError(
        'Les deux nouveaux mots de passe ne correspondent pas.'
      );
      return;
    }

    /*
      TODO:
      Connecter ici ton service backend de changement
      de mot de passe.

      Exemple futur :

      await authService.changePassword({
        oldPassword,
        newPassword,
      });
    */

    setSaved(true);

    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const passwordFieldSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 3,
      bgcolor: 'var(--pv-canvas)',
      transition: '.2s ease',

      '&:hover': {
        bgcolor: 'var(--pv-surface)',
      },

      '&.Mui-focused': {
        bgcolor: 'var(--pv-surface)',
        boxShadow:
          '0 0 0 4px rgba(236,72,153,.08)',
      },
    },
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'var(--pv-surface-alt)',
        pb: 8,
      }}
    >

      {/* =====================================================
          HERO
      ====================================================== */}

      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          background:
            'linear-gradient(135deg, #080808 0%, #151016 55%, #24101f 100%)',
          color: '#fff',
          py: {
            xs: 5,
            md: 7,
          },
        }}
      >

        {/* Pink glow */}

        <Box
          sx={{
            position: 'absolute',
            width: 430,
            height: 430,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(236,72,153,.28), transparent 70%)',
            top: -230,
            right: -100,
            animation:
              'securityGlow 8s ease-in-out infinite',
          }}
        />

        {/* Purple glow */}

        <Box
          sx={{
            position: 'absolute',
            width: 350,
            height: 350,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(168,85,247,.17), transparent 70%)',
            bottom: -230,
            left: -120,
            animation:
              'securityGlow 10s ease-in-out infinite reverse',
          }}
        />

        {/* Grid */}

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: 0.07,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)',
            backgroundSize: '45px 45px',
            maskImage:
              'linear-gradient(to bottom, black, transparent)',
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: 'relative',
            zIndex: 2,
            /*
              L'en-tête suit la même colonne que le contenu : sans cela
              le titre reste collé au bord gauche pendant que les cartes
              sont centrées, et la page paraît décousue.
              720 = colonne principale ; 1104 = colonne + barre latérale.
            */
            /*
              Colonne flexible : chaque enfant occupe la même largeur que
              le contenu plus bas, quel que soit son type. Les marges
              automatiques ne suffisaient pas — elles n'ont aucun effet
              sur un bouton, qui est un élément en ligne.
              720 = colonne principale ; 1104 = colonne + barre latérale.
            */
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

            '&& > *': {
              width: '100%',
              maxWidth: { xs: 720, lg: 1104 },
            },

            /* Le bouton de retour reste calé à gauche de sa colonne. */
            '&& > .MuiButtonBase-root': {
              justifyContent: 'flex-start',
            },
          }}
        >

          <Button
            component={Link}
            to="/account/profile"
            startIcon={<ArrowBackRounded />}
            sx={{
              color: 'rgba(255,255,255,.75)',
              mb: 4,
              px: 0,

              '&:hover': {
                color: '#fff',
                background: 'transparent',
              },
            }}
          >
            Retour au profil
          </Button>

          <Typography
            sx={{
              fontSize: 12,
              fontWeight: 900,
              letterSpacing: '.22em',
              color: '#f472b6',
              mb: 1,
            }}
          >
            PIVOT STORE ACCOUNT
          </Typography>

          <Typography
            variant="h1"
            sx={{
              fontSize: {
                xs: '2.7rem',
                sm: '3.8rem',
                md: '5rem',
              },
              lineHeight: .95,
              fontWeight: 950,
              letterSpacing: '-.055em',
              mb: 2,
            }}
          >
            Sécurité<span style={{ color: '#ec4899' }}>.</span>
          </Typography>

          <Typography
            sx={{
              maxWidth: 650,
              color: 'rgba(255,255,255,.68)',
              fontSize: {
                xs: 15,
                md: 18,
              },
            }}
          >
            Protégez votre compte et gardez vos
            informations personnelles en sécurité.
          </Typography>

        </Container>
      </Box>


      {/* =====================================================
          CONTENT
      ====================================================== */}

      <Container
        maxWidth="lg"
        sx={{
          mt: {
            xs: -3,
            md: -4,
          },
          position: 'relative',
          zIndex: 5,
        }}
      >

        <Box
          sx={{
            display: 'grid',
            /*
              La colonne de contenu est plafonnée et centrée. Sans cela
              elle suivait la largeur de l'écran : sur un grand moniteur,
              une carte de plus de mille pixels pour un formulaire de mot
              de passe, avec un vide à droite.
            */
            gridTemplateColumns: {
              xs: 'minmax(0, 720px)',
              lg: 'minmax(0, 720px) 360px',
            },
            justifyContent: 'center',
            gap: 3,
          }}
        >

          {/* =================================================
              PASSWORD CARD
          ================================================== */}

          <Paper
            elevation={0}
            sx={{
              overflow: 'hidden',
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'rgba(0,0,0,.07)',
              bgcolor: 'var(--pv-surface)',
              boxShadow:
                '0 20px 60px rgba(0,0,0,.07)',
              animation:
                'securityEnter .6s ease both',
            }}
          >

            {/* Gradient top */}

            <Box
              sx={{
                height: 5,
                background:
                  'linear-gradient(90deg, #ec4899, #a855f7, #ec4899)',
              }}
            />

            <Box
              sx={{
                p: {
                  xs: 3,
                  md: 5,
                },
              }}
              >

              {/* Header */}

              <Stack
                direction="row"
                spacing={2}
               
                mb={4} sx={{ alignItems: 'center' }}>

                <Box
                  sx={{
                    width: 58,
                    height: 58,
                    borderRadius: '18px',
                    bgcolor: 'var(--pv-accent-soft)',
                    color: '#ec4899',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <LockOutlined
                    sx={{ fontSize: 29 }}
                  />
                </Box>

                <Box>

                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 900,
                      letterSpacing: '.12em',
                      color: '#ec4899',
                    }}
                  >
                    MOT DE PASSE
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight={950}
                    sx={{
                      letterSpacing: '-.03em',
                    }}
                  >
                    Modifier votre mot de passe
                  </Typography>

                </Box>

              </Stack>


              <Divider sx={{ mb: 4 }} />


              {/* Success */}

              {saved && (
                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    bgcolor: '#ecfdf3',
                    border:
                      '1px solid #bbf7d0',
                    color: 'var(--pv-success)',
                    animation:
                      'securityEnter .3s ease both',
                  }}
                >

                  <CheckCircleRounded />

                  <Box>

                    <Typography
                      fontWeight={900}
                    >
                      Mot de passe modifié
                    </Typography>

                    <Typography
                      variant="body2"
                    >
                      Votre nouveau mot de passe a
                      été enregistré avec succès.
                    </Typography>

                  </Box>

                </Box>
              )}


              {/* Error */}

              {error && (
                <Box
                  sx={{
                    mb: 3,
                    p: 2,
                    borderRadius: 3,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    bgcolor: 'var(--pv-error-soft)',
                    border:
                      '1px solid #fecaca',
                    color: 'var(--pv-error)',
                  }}
                >

                  <WarningAmberRounded />

                  <Typography
                    fontWeight={700}
                    variant="body2"
                  >
                    {error}
                  </Typography>

                </Box>
              )}


              {/* Fields */}

              {/*
                Un champ de mot de passe qui s'étire sur toute la largeur
                d'un écran de bureau est pénible à viser et déséquilibre
                la carte. On le ramène à une colonne de lecture
                confortable ; la carte, elle, reste pleine largeur comme
                les autres.
              */}
              <Stack spacing={2.5} sx={{ maxWidth: 520 }}>

                <TextField
                  fullWidth
                  label="Ancien mot de passe"
                  type={
                    showOld
                      ? 'text'
                      : 'password'
                  }
                  value={oldPassword}
                  onChange={e =>
                    setOldPassword(
                      e.target.value
                    )
                  }
                 
                  sx={passwordFieldSx}
          slotProps={{
            input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined
                          sx={{
                            color:
                              'text.secondary',
                          }}
                        />
                      </InputAdornment>
                    ),

                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowOld(
                              !showOld
                            )
                          }
                          edge="end"
                        >
                          {showOld ? (
                            <VisibilityOffOutlined />
                          ) : (
                            <VisibilityOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
          }}
        />


                <TextField
                  fullWidth
                  label="Nouveau mot de passe"
                  type={
                    showNew
                      ? 'text'
                      : 'password'
                  }
                  value={newPassword}
                  onChange={e =>
                    setNewPassword(
                      e.target.value
                    )
                  }
                 
                  sx={passwordFieldSx}
          slotProps={{
            input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <KeyOutlined
                          sx={{
                            color:
                              'text.secondary',
                          }}
                        />
                      </InputAdornment>
                    ),

                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowNew(
                              !showNew
                            )
                          }
                          edge="end"
                        >
                          {showNew ? (
                            <VisibilityOffOutlined />
                          ) : (
                            <VisibilityOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
          }}
        />


                {/* Password strength */}

                <Box
                  sx={{
                    mt: -1,
                    p: 2,
                    borderRadius: 3,
                    bgcolor: 'var(--pv-canvas)',
                    border:
                      '1px solid var(--pv-line)',
                  }}
                >

                  <Stack
                    direction="row"
                   
                   
                    mb={1} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>

                    <Typography
                      variant="body2"
                      fontWeight={800}
                    >
                      Robustesse du mot de passe
                    </Typography>

                    <Typography
                      variant="body2"
                      fontWeight={900}
                      sx={{
                        color:
                          strength.color,
                      }}
                    >
                      {strength.label}
                    </Typography>

                  </Stack>

                  <Box
                    sx={{
                      height: 6,
                      borderRadius: 10,
                      bgcolor: 'var(--pv-line)',
                      overflow: 'hidden',
                    }}
                  >

                    <Box
                      sx={{
                        width:
                          `${strength.value}%`,
                        height: '100%',
                        borderRadius: 10,
                        bgcolor:
                          strength.color,
                        transition:
                          'width .3s ease, background .3s ease',
                      }}
                    />

                  </Box>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      display: 'block',
                      mt: 1,
                    }}
                  >
                    Utilisez au moins 8 caractères,
                    une majuscule, un chiffre et un
                    caractère spécial.
                  </Typography>

                </Box>


                <TextField
                  fullWidth
                  label="Confirmer le nouveau mot de passe"
                  type={
                    showConfirm
                      ? 'text'
                      : 'password'
                  }
                  value={confirmPassword}
                  onChange={e =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  error={
                    Boolean(
                      confirmPassword &&
                      newPassword !==
                        confirmPassword
                    )
                  }
                  helperText={
                    confirmPassword &&
                    newPassword !==
                      confirmPassword
                      ? 'Les mots de passe ne correspondent pas.'
                      : ''
                  }
                 
                  sx={passwordFieldSx}
          slotProps={{
            input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <ShieldOutlined
                          sx={{
                            color:
                              'text.secondary',
                          }}
                        />
                      </InputAdornment>
                    ),

                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() =>
                            setShowConfirm(
                              !showConfirm
                            )
                          }
                          edge="end"
                        >
                          {showConfirm ? (
                            <VisibilityOffOutlined />
                          ) : (
                            <VisibilityOutlined />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
          }}
        />


                {/* Submit */}

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={
                    saved
                      ? <CheckCircleRounded />
                      : <LockOutlined />
                  }
                  onClick={handleSubmit}
                  sx={{
                    mt: 1,
                    minHeight: 56,
                    borderRadius: 3,
                    fontWeight: 900,
                    fontSize: 15,
                    textTransform: 'none',
                    background:
                      'linear-gradient(135deg, #ec4899, #be185d)',
                    boxShadow:
                      '0 14px 30px rgba(236,72,153,.24)',
                    transition: '.25s ease',

                    '&:hover': {
                      background:
                        'linear-gradient(135deg, #db2777, #9d174d)',
                      transform:
                        'translateY(-2px)',
                      boxShadow:
                        '0 18px 35px rgba(236,72,153,.30)',
                    },
                  }}
                >
                  Modifier le mot de passe
                </Button>

              </Stack>

            </Box>
          </Paper>


          {/* =================================================
              SIDE PANEL
          ================================================== */}

          <Stack
            spacing={2}
            sx={{
              animation:
                'securityEnter .7s ease both',
            }}
          >

            {/* Security status */}

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                color: '#fff',
                overflow: 'hidden',
                position: 'relative',
                background:
                  'linear-gradient(145deg, #0b0b0b, #20131d)',
                border:
                  '1px solid rgba(255,255,255,.06)',
                boxShadow:
                  '0 20px 50px rgba(0,0,0,.15)',
              }}
            >

              <Box
                sx={{
                  position: 'absolute',
                  width: 180,
                  height: 180,
                  borderRadius: '50%',
                  background:
                    'radial-gradient(circle, rgba(236,72,153,.23), transparent 70%)',
                  right: -80,
                  top: -80,
                }}
              />

              <Box
                sx={{
                  position: 'relative',
                  zIndex: 2,
                }}
              >

                <Chip
                  icon={
                    <CheckCircleRounded />
                  }
                  label="COMPTE PROTÉGÉ"
                  size="small"
                  sx={{
                    mb: 2,
                    bgcolor:
                      'rgba(34,197,94,.12)',
                    color: '#86efac',
                    border:
                      '1px solid rgba(134,239,172,.2)',
                    fontWeight: 900,
                    fontSize: 10,
                  }}
                />

                <Typography
                  variant="h6"
                  fontWeight={950}
                  mb={1}
                >
                  Votre sécurité compte.
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color:
                      'rgba(255,255,255,.62)',
                    lineHeight: 1.7,
                  }}
                >
                  Gardez un mot de passe unique et
                  difficile à deviner pour protéger
                  votre compte Pivot Store.
                </Typography>

              </Box>

            </Paper>


            {/* Security tips */}

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: 'var(--pv-surface)',
                border: '1px solid',
                borderColor: 'rgba(0,0,0,.07)',
                boxShadow:
                  '0 12px 35px rgba(0,0,0,.05)',
              }}
            >

              <Stack
                direction="row"
                spacing={1.5}
               
                mb={3} sx={{ alignItems: 'center' }}>

                <Box
                  sx={{
                    width: 44,
                    height: 44,
                    borderRadius: 2.5,
                    bgcolor: 'var(--pv-accent-soft)',
                    color: '#ec4899',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <SecurityRounded />
                </Box>

                <Typography
                  fontWeight={950}
                >
                  Conseils de sécurité
                </Typography>

              </Stack>


              <Stack spacing={2}>

                <SecurityTip
                  icon={<KeyOutlined />}
                  title="Mot de passe unique"
                  description="Évitez de réutiliser le même mot de passe."
                />

                <SecurityTip
                  icon={<ShieldOutlined />}
                  title="Plus il est long, mieux c'est"
                  description="Privilégiez un mot de passe d'au moins 8 caractères."
                />

                <SecurityTip
                  icon={<LockOutlined />}
                  title="Ne le partagez jamais"
                  description="Pivot Store ne vous demandera jamais votre mot de passe."
                />

              </Stack>

            </Paper>


            {/* Privacy card */}

            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 4,
                bgcolor: 'var(--pv-canvas)',
                border: '1px solid',
                borderColor: 'rgba(0,0,0,.06)',
              }}
            >

              <Stack
                direction="row"
                spacing={1.5} sx={{ alignItems: 'flex-start' }}>

                <ShieldOutlined
                  sx={{
                    color: 'var(--pv-success)',
                    mt: .2,
                  }}
                />

                <Box>

                  <Typography
                    fontWeight={900}
                    mb={.5}
                  >
                    Confidentialité
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    lineHeight={1.6}
                  >
                    Vos informations de sécurité
                    restent privées et protégées.
                  </Typography>

                </Box>

              </Stack>

            </Paper>

          </Stack>

        </Box>


        {/* ===================================================
            BOTTOM INFO
        ==================================================== */}

        <Paper
          elevation={0}
          sx={{
            mt: 3,
            p: {
              xs: 3,
              md: 4,
            },
            borderRadius: 4,
            background:
              'linear-gradient(135deg, #fff, var(--pv-accent-soft))',
            border:
              '1px solid rgba(236,72,153,.10)',
          }}
        >

          <Stack
            direction={{
              xs: 'column',
              md: 'row',
            }}
            spacing={2} sx={{ alignItems: {
              xs: 'flex-start',
              md: 'center',
            } }}>

            <Box
              sx={{
                width: 50,
                height: 50,
                borderRadius: '16px',
                bgcolor: 'var(--pv-surface)',
                color: '#ec4899',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow:
                  '0 8px 20px rgba(0,0,0,.06)',
              }}
            >
              <ShieldOutlined />
            </Box>

            <Box>

              <Typography
                fontWeight={950}
                mb={.5}
              >
                Votre compte, votre sécurité.
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
              >
                En cas d'activité inhabituelle,
                pensez à modifier immédiatement votre
                mot de passe.
              </Typography>

            </Box>

          </Stack>

        </Paper>

      </Container>


      {/* =====================================================
          ANIMATIONS
      ====================================================== */}

      <style>
        {`
          @keyframes securityEnter {
            from {
              opacity: 0;
              transform: translateY(18px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes securityGlow {
            0%, 100% {
              transform:
                translate3d(0, 0, 0)
                scale(1);
            }

            50% {
              transform:
                translate3d(20px, 15px, 0)
                scale(1.08);
            }
          }
        `}
      </style>

    </Box>
  );
}


/* =========================================================
   SECURITY TIP COMPONENT
========================================================= */

function SecurityTip({
  icon,
  title,
  description,
}) {
  return (
    <Stack
      direction="row"
      spacing={1.5} sx={{ alignItems: 'flex-start' }}>

      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 2,
          bgcolor: 'var(--pv-surface-alt)',
          color: '#ec4899',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {React.cloneElement(icon, {
          sx: {
            fontSize: 19,
          },
        })}
      </Box>

      <Box>

        <Typography
          variant="body2"
          fontWeight={900}
          mb={.3}
        >
          {title}
        </Typography>

        <Typography
          variant="caption"
          color="text.secondary"
          lineHeight={1.5}
        >
          {description}
        </Typography>

      </Box>

    </Stack>
  );
}


export default Security;