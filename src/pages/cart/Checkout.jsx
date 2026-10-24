import React, { useState } from 'react';

import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import {
  ArrowBackRounded,
  ArrowForwardRounded,
  CheckCircleRounded,
  LockRounded,
  ShoppingBagRounded,
} from '@mui/icons-material';

import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import useCart from '../../hooks/useCart';
import { addOrder } from '../../store/slices/orderSlice';

import AddressForm from '../../components/checkout/AddressForm';
import PaymentMethod from '../../components/checkout/PaymentMethod';
import QrPayment from '../../components/checkout/QrPayment';
import OrderSummary from '../../components/checkout/OrderSummary';

import api from '../../services/api';
import formatCurrency from '../../utils/formatCurrency';
import orderService from '../../services/orderService';
import paymentService from '../../services/paymentService';


const MOBILE_PROVIDERS = [
  'mpesa',
  'airtel',
  'orange',
];

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    items,
    totalPrice,
    clearCart,
  } = useCart();

  const [step, setStep] = useState(1);

  /*
   * Code promotionnel. La remise est calculée par le serveur, jamais
   * ici : un rabais décidé côté navigateur se contrefait en deux clics.
   */
  const [couponCode, setCouponCode] = useState('');
  const [coupon, setCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [couponChecking, setCouponChecking] = useState(false);

  const applyCoupon = async () => {
    const code = couponCode.trim();

    if (!code) {
      return;
    }

    setCouponError('');
    setCouponChecking(true);

    try {
      const { data } = await api.get(
        `/coupons/${encodeURIComponent(code)}/check?total=${totalPrice}`,
      );

      setCoupon(data);
    } catch (error) {
      const payload = error?.response?.data;

      const messages = {
        COUPON_NOT_FOUND: 'Ce code n’existe pas.',
        COUPON_EXPIRED: 'Ce code a expiré.',
        COUPON_EXHAUSTED: 'Ce code a atteint sa limite d’utilisation.',
        COUPON_MINIMUM_NOT_REACHED: payload?.minimumAmount
          ? `Ce code s’applique à partir de ${payload.minimumAmount} FC.`
          : 'Montant minimum non atteint.',
      };

      setCoupon(null);
      setCouponError(messages[payload?.message] || 'Code non valable.');
    }

    setCouponChecking(false);
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponCode('');
    setCouponError('');
  };

  /* Montant réellement dû, remise comprise. */
  const payable = coupon ? coupon.total : totalPrice;

  const [address, setAddress] = useState({
    name: '',
    phone: '',
    city: 'Kinshasa',
    commune: '',
    address: '',
  });

  const [payment, setPayment] = useState(
    location.state?.paymentMethod || 'card',
  );

  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: '',
  });

  const [mobilePhone, setMobilePhone] = useState(
    location.state?.paymentPhone || '',
  );

  const [error, setError] = useState('');

  const [fieldErrors, setFieldErrors] =
    useState({});

  const [loading, setLoading] =
    useState(false);

  if (!items || items.length === 0) {
    return (
      <Box
        sx={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          py: 8,
          bgcolor: 'var(--pv-canvas)',
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={0}
            sx={{
              p: { xs: 4, md: 6 },
              textAlign: 'center',
              borderRadius: 4,
              border: '1px solid var(--pv-line)',
              bgcolor: 'var(--pv-surface)',
            }}
          >
            <Box
              sx={{
                width: 80,
                height: 80,
                mx: 'auto',
                mb: 3,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'var(--pv-surface-alt)',
              }}
            >
              <ShoppingBagRounded
                sx={{
                  fontSize: 40,
                  color: 'var(--pv-muted)',
                }}
              />
            </Box>

            <Typography
              variant="h5"
              fontWeight={800}
              sx={{ mb: 1 }}
            >
              Votre panier est vide
            </Typography>

            <Typography
              color="text.secondary"
              sx={{ mb: 4 }}
            >
              Ajoutez quelques articles à votre panier
              avant de passer commande.
            </Typography>

            <Button
              component={Link}
              to="/shop"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardRounded />}
              sx={{
                borderRadius: 2.5,
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 700,
                boxShadow: 'none',
                background:
                  'linear-gradient(135deg, var(--pv-ink), #4C1D95)',
                '&:hover': {
                  boxShadow: 'none',
                  background:
                    'linear-gradient(135deg, var(--pv-ink), #3b0764)',
                },
              }}
            >
              Découvrir la boutique
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  const updateAddress = (field, value) => {
    setAddress(previous => ({
      ...previous,
      [field]: value,
    }));

    setFieldErrors(previous => ({
      ...previous,
      [field]: '',
    }));

    setError('');
  };

  const updateCard = (field, value) => {
    setCardData(previous => ({
      ...previous,
      [field]: value,
    }));

    setError('');
  };

  const validateAddress = () => {
    const errors = {};

    if (
      !address.name ||
      address.name.trim().length < 3
    ) {
      errors.name =
        'Veuillez saisir votre nom complet.';
    }

    const cleanedPhone = String(
      address.phone || '',
    )
      .replace(/[\s().-]/g, '')
      .trim();

    if (!cleanedPhone) {
      errors.phone =
        'Veuillez saisir votre numéro de téléphone.';
    } else if (
      !/^(\+243|0)\d{9}$/.test(
        cleanedPhone,
      )
    ) {
      errors.phone =
        'Veuillez saisir un numéro congolais valide.';
    }

    if (
      !address.city ||
      !address.city.trim()
    ) {
      errors.city =
        'Veuillez sélectionner une ville.';
    }

    if (
      !address.commune ||
      !address.commune.trim()
    ) {
      errors.commune =
        'Veuillez sélectionner une commune.';
    }

    if (
      !address.address ||
      address.address.trim().length < 5
    ) {
      errors.address =
        'Veuillez saisir une adresse suffisamment précise.';
    }

    return errors;
  };

  const checkAddress = () => {
    const errors = validateAddress();

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);

      setError(
        'Veuillez vérifier vos informations de livraison.',
      );

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

      return false;
    }

    setFieldErrors({});
    setError('');

    return true;
  };

  const continueToPayment = () => {
    if (!checkAddress()) {
      return;
    }

    setError('');
    setStep(2);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const backToAddress = () => {
    if (loading) {
      return;
    }

    setError('');
    setStep(1);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const validatePayment = () => {
    if (!payment) {
      setError(
        'Veuillez sélectionner un mode de paiement.',
      );

      return false;
    }

    if (payment === 'card') {
      const cardNumber =
        cardData.cardNumber.replace(
          /\s/g,
          '',
        );

      if (!/^\d{13,19}$/.test(cardNumber)) {
        setError(
          'Veuillez saisir un numéro de carte valide.',
        );

        return false;
      }

      if (!cardData.cardName.trim()) {
        setError(
          'Veuillez saisir le nom présent sur la carte.',
        );

        return false;
      }

      if (
        !/^\d{2}\/\d{2}$/.test(
          cardData.expiry,
        )
      ) {
        setError(
          'Veuillez saisir une date d’expiration valide (MM/AA).',
        );

        return false;
      }

      const [month, year] = cardData.expiry
        .split('/')
        .map(Number);
      const now = new Date();
      const expiryDate = new Date(
        2000 + year,
        month,
        0,
        23,
        59,
        59,
      );

      if (
        month < 1 ||
        month > 12 ||
        expiryDate < now
      ) {
        setError(
          'Votre carte est expirée ou sa date est invalide.',
        );

        return false;
      }

      if (
        !/^\d{3,4}$/.test(
          cardData.cvv,
        )
      ) {
        setError(
          'Veuillez saisir un CVV valide.',
        );

        return false;
      }

      return true;
    }

    if (
      MOBILE_PROVIDERS.includes(payment)
    ) {
      const cleanedPhone =
        String(mobilePhone || '')
          .replace(/[\s().-]/g, '')
          .trim();

      if (
        !/^(\+243|0)\d{9}$/.test(
          cleanedPhone,
        )
      ) {
        setError(
          'Veuillez saisir un numéro de téléphone congolais valide.',
        );

        return false;
      }

      return true;
    }

    return true;
  };

  const finalizeOrder = async ({
    provider,
    transactionId,
    paidFrom,
  }) => {
    setLoading(true);
    setError('');

    try {
      const order =
        await orderService.createOrder({
          items,
          address,
          total: totalPrice,
          paymentMethod: provider,
        });

      const transaction = transactionId
        ? {
            transactionId,
            status: 'paid',
          }
        : await paymentService.initiatePayment({
            orderId: order.id,
            amount: totalPrice,
            provider,
            phone:
              provider === 'card'
                ? address.phone
                : mobilePhone,
            card:
              provider === 'card'
                ? cardData
                : undefined,
          });

      if (
        !transaction ||
        transaction.status !== 'paid'
      ) {
        throw new Error(
          'PAYMENT_FAILED',
        );
      }

      /* La commande est créée avant le paiement (l'opérateur a besoin de son
         numéro) : on lui rattache la référence une fois celui-ci confirmé. */
      const paidOrder = await orderService.attachPayment(order.id, {
        transactionId: transaction.transactionId,
        paymentMethod: provider,
        paidFrom: paidFrom || 'desktop',
      });

      const finalOrder = paidOrder || {
        ...order,
        transactionId: transaction.transactionId,
      };

      /* Copie locale : une commande passée sans compte reste visible sur
         cet appareil, la page Commandes fusionne les deux sources. */
      dispatch(addOrder(finalOrder));

      clearCart();

      navigate(
        `/orders/${order.id}`,
      );
    } catch (err) {
      console.error(
        'Erreur checkout :',
        err,
      );

      let message =
        'Impossible de finaliser votre commande.';

      if (
        err?.message ===
        'PAYMENT_DECLINED'
      ) {
        message =
          'Le paiement a été refusé. Vérifiez vos informations et réessayez.';
      } else if (
        err?.message ===
        'INVALID_PAYMENT_PHONE'
      ) {
        message =
          'Le numéro utilisé pour le paiement est invalide.';
      } else if (
        err?.message ===
        'PAYMENT_PROVIDER_REQUIRED'
      ) {
        message =
          'Veuillez sélectionner un mode de paiement.';
      } else if (
        err?.message ===
        'INVALID_PAYMENT_AMOUNT'
      ) {
        message =
          'Le montant du paiement est invalide.';
      } else if (
        err?.message ===
        'INVALID_CARD_DETAILS'
      ) {
        message =
          'Les informations de votre carte sont incomplètes.';
      } else if (
        err?.message ===
        'PAYMENT_FAILED'
      ) {
        message =
          'Le paiement n’a pas pu être confirmé.';
      }

      setError(message);

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } finally {
      setLoading(false);
    }
  };

  const submit = async () => {
    if (!checkAddress()) {
      setStep(1);
      return;
    }

    if (!validatePayment()) {
      return;
    }

    await finalizeOrder({
      provider: payment,
      paidFrom: 'desktop',
    });
  };

  const handleQrPaid = async session => {
    if (!session) {
      setError(
        'Impossible de confirmer le paiement QR.',
      );

      return;
    }

    await finalizeOrder({
      provider:
        session.provider || payment,
      transactionId:
        session.transactionId,
      paidFrom: 'qr',
    });
  };

  const isMobilePayment =
    MOBILE_PROVIDERS.includes(
      payment,
    );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'var(--pv-canvas)',
        pb: 8,
      }}
    >
      <Box
        sx={{
          background:
            'linear-gradient(135deg, var(--pv-ink), #4C1D95)',
          color: '#fff',
          py: { xs: 5, md: 7 },
        }}
      >
        <Container maxWidth="xl">
          <Box
            sx={{
              maxWidth: 1100,
              mx: 'auto',
            }}
          >
            <Typography
              variant="overline"
              sx={{
                fontWeight: 800,
                letterSpacing: 2,
                opacity: 0.8,
              }}
            >
              PIVOT STORE CHECKOUT
            </Typography>

            <Typography
              variant="h3"
              sx={{
                mt: 1,
                fontWeight: 900,
                letterSpacing: '-0.04em',
                fontSize: {
                  xs: '2rem',
                  md: '3rem',
                },
              }}
            >
              Finalisez votre commande.
            </Typography>

            <Typography
              sx={{
                mt: 1.5,
                maxWidth: 650,
                color:
                  'rgba(255,255,255,0.75)',
                fontSize: '1rem',
              }}
            >
              Complétez vos informations de livraison,
              choisissez votre mode de paiement et recevez
              votre commande en toute sécurité.
            </Typography>

            <Box sx={{ mt: 5 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'var(--pv-surface)',
                        color: '#4C1D95',
                        fontWeight: 900,
                      }}
                    >
                      {step > 1 ? (
                        <CheckCircleRounded />
                      ) : (
                        '01'
                      )}
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          color:
                            'rgba(255,255,255,0.6)',
                          fontWeight: 700,
                        }}
                      >
                        ÉTAPE 01
                      </Typography>

                      <Typography fontWeight={800}>
                        Livraison
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      opacity:
                        step >= 2 ? 1 : 0.45,
                    }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor:
                          step >= 2
                            ? 'var(--pv-surface)'
                            : 'rgba(255,255,255,0.15)',
                        color:
                          step >= 2
                            ? '#4C1D95'
                            : '#fff',
                        fontWeight: 900,
                      }}
                    >
                      02
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          color:
                            'rgba(255,255,255,0.6)',
                          fontWeight: 700,
                        }}
                      >
                        ÉTAPE 02
                      </Typography>

                      <Typography fontWeight={800}>
                        Paiement
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      opacity: 0.45,
                    }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor:
                          'rgba(255,255,255,0.15)',
                        color: '#fff',
                        fontWeight: 900,
                      }}
                    >
                      03
                    </Box>

                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          color:
                            'rgba(255,255,255,0.6)',
                          fontWeight: 700,
                        }}
                      >
                        ÉTAPE 03
                      </Typography>

                      <Typography fontWeight={800}>
                        Confirmation
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          mt: {
            xs: 3,
            md: 5,
          },
        }}
      >
        <Grid
          container
          spacing={3} sx={{ alignItems: 'flex-start' }}>
          <Grid size={{ xs: 12, md: 8 }}>
            {error && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  borderRadius: 3,
                }}
              >
                {error}
              </Alert>
            )}

            {step === 1 && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: '1px solid var(--pv-line)',
                  overflow: 'hidden',
                  bgcolor: 'var(--pv-surface)',
                }}
              >
                <Box
                  sx={{
                    px: {
                      xs: 2.5,
                      md: 4,
                    },
                    py: 3,
                    borderBottom:
                      '1px solid var(--pv-line)',
                  }}
                >
                  <Stack
                    direction="row"
                   
                    spacing={2} sx={{ alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 46,
                        height: 46,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#f3e8ff',
                        color: '#7e22ce',
                      }}
                    >
                      <ShoppingBagRounded />
                    </Box>

                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={800}
                      >
                        Informations de livraison
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Où devons-nous livrer votre commande ?
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Box
                  sx={{
                    p: {
                      xs: 2.5,
                      md: 4,
                    },
                  }}
                >
                  <AddressForm
                    address={address}
                    onChange={updateAddress}
                    errors={fieldErrors}
                  />

                  <Box sx={{ mt: 4 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={continueToPayment}
                      endIcon={
                        <ArrowForwardRounded />
                      }
                      sx={{
                        py: 1.8,
                        borderRadius: 2.5,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 700,
                        boxShadow: 'none',
                        background:
                          'linear-gradient(135deg, var(--pv-ink), #4C1D95)',
                        '&:hover': {
                          boxShadow: 'none',
                          background:
                            'linear-gradient(135deg, var(--pv-ink), #3b0764)',
                        },
                      }}
                    >
                      Continuer vers le paiement
                    </Button>
                  </Box>
                </Box>
              </Paper>
            )}

            {step === 2 && (
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: '1px solid var(--pv-line)',
                  overflow: 'hidden',
                  bgcolor: 'var(--pv-surface)',
                }}
              >
                <Box
                  sx={{
                    px: {
                      xs: 2.5,
                      md: 4,
                    },
                    py: 3,
                    borderBottom:
                      '1px solid var(--pv-line)',
                  }}
                >
                  <Stack
                    direction="row"
                   
                    spacing={2} sx={{ alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 46,
                        height: 46,
                        borderRadius: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: '#f3e8ff',
                        color: '#7e22ce',
                      }}
                    >
                      <LockRounded />
                    </Box>

                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight={800}
                      >
                        Mode de paiement
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        Choisissez comment vous souhaitez payer.
                      </Typography>
                    </Box>
                  </Stack>
                </Box>

                <Box
                  sx={{
                    p: {
                      xs: 2.5,
                      md: 4,
                    },
                  }}
                >
                  <PaymentMethod
                    value={payment}
                    onChange={setPayment}
                    cardData={cardData}
                    onCardChange={updateCard}
                    mobilePhone={mobilePhone}
                    onMobilePhoneChange={value => {
                      setMobilePhone(value);
                      setError('');
                    }}
                  />

                  {isMobilePayment && (
                    <QrPayment
                      amount={payable}
                      itemCount={items.length}
                      customerName={address.name}
                      provider={payment}
                      mobilePhone={mobilePhone}
                      onPaid={handleQrPaid}
                    />
                  )}

                  <Box
                    sx={{
                      mt: 3,
                      p: 2,
                      borderRadius: 2.5,
                      bgcolor: 'var(--pv-canvas)',
                      border:
                        '1px solid var(--pv-line)',
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={1.5} sx={{ alignItems: 'center' }}>
                      <LockRounded
                        sx={{
                          fontSize: 20,
                          color: 'var(--pv-success)',
                        }}
                      />

                      <Box>
                        <Typography
                          variant="body2"
                          fontWeight={700}
                        >
                          Paiement sécurisé
                        </Typography>

                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          Vos informations de paiement sont protégées.
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>

                  {!isMobilePayment && (
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      disabled={loading}
                      onClick={submit}
                      endIcon={
                        !loading && (
                          <ArrowForwardRounded />
                        )
                      }
                      sx={{
                        mt: 3,
                        py: 1.8,
                        borderRadius: 2.5,
                        textTransform: 'none',
                        fontSize: '1rem',
                        fontWeight: 700,
                        boxShadow: 'none',
                        background:
                          'linear-gradient(135deg, var(--pv-ink), #4C1D95)',
                        '&:hover': {
                          boxShadow: 'none',
                          background:
                            'linear-gradient(135deg, var(--pv-ink), #3b0764)',
                        },
                      }}
                    >
                      {loading
                        ? 'Paiement en cours…'
                        : 'Payer maintenant'}
                    </Button>
                  )}

                  {isMobilePayment && (
                    <Typography
                      sx={{
                        mt: 2,
                        textAlign: 'center',
                        fontSize: '0.7rem',
                        color: 'var(--pv-muted)',
                      }}
                    >
                      Utilisez le bouton « Payer maintenant »
                      dans le bloc de paiement mobile pour confirmer.
                    </Typography>
                  )}

                  <Button
                    fullWidth
                    variant="text"
                    disabled={loading}
                    onClick={backToAddress}
                    startIcon={
                      <ArrowBackRounded />
                    }
                    sx={{
                      mt: 1,
                      py: 1.2,
                      borderRadius: 2.5,
                      textTransform: 'none',
                      fontWeight: 600,
                      color: 'var(--pv-muted)',
                    }}
                  >
                    Modifier mes coordonnées
                  </Button>
                </Box>
              </Paper>
            )}
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Stack
              spacing={2}
              sx={{
                position: {
                  md: 'sticky',
                },
                top: {
                  md: 24,
                },
              }}
            >
              {/* Code promotionnel : vérifié par le serveur. */}
              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  mb: 2,
                  borderRadius: '20px',
                  border: '1px solid var(--pv-line)',
                  bgcolor: 'var(--pv-surface)',
                }}
              >
                <Typography
                  sx={{ fontWeight: 800, color: 'var(--pv-ink)', fontSize: 15, mb: 1.5 }}
                >
                  Code promotionnel
                </Typography>

                {coupon ? (
                  <Stack
                    direction="row"
                    spacing={1}
                    sx={{ alignItems: 'center', justifyContent: 'space-between' }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 800, color: 'var(--pv-success)' }}>
                        {coupon.code}
                      </Typography>

                      <Typography sx={{ fontSize: 13, color: 'var(--pv-body)' }}>
                        Remise de {formatCurrency(coupon.discount)}
                      </Typography>
                    </Box>

                    <Button onClick={removeCoupon} size="small" sx={{ textTransform: 'none' }}>
                      Retirer
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={1}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Votre code"
                      value={couponCode}
                      onChange={event => setCouponCode(event.target.value.toUpperCase())}
                      error={Boolean(couponError)}
                      helperText={couponError || ' '}
                    />

                    <Button
                      onClick={applyCoupon}
                      disabled={couponChecking || couponCode.trim().length === 0}
                      variant="outlined"
                      sx={{ height: 40, textTransform: 'none', fontWeight: 700 }}
                    >
                      {couponChecking ? '…' : 'Appliquer'}
                    </Button>
                  </Stack>
                )}
              </Paper>

              <OrderSummary
                items={items}
                total={payable}
                shipping={0}
              />

              <Paper
                elevation={0}
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  border: '1px solid var(--pv-line)',
                  bgcolor: 'var(--pv-surface)',
                }}
              >
                <Stack spacing={2}>
                  <Stack
                    direction="row"
                    spacing={1.5} sx={{ alignItems: 'center' }}>
                    <CheckCircleRounded
                      sx={{
                        color: 'var(--pv-success)',
                      }}
                    />

                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                      >
                        Livraison sécurisée
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Nous prenons soin de votre commande.
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={1.5} sx={{ alignItems: 'center' }}>
                    <LockRounded
                      sx={{
                        color: '#7e22ce',
                      }}
                    />

                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight={700}
                      >
                        Paiement protégé
                      </Typography>

                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        Paiement mobile sécurisé.
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Paper>

              <Button
                component={Link}
                to="/cart"
                variant="outlined"
                startIcon={
                  <ArrowBackRounded />
                }
                sx={{
                  borderRadius: 2.5,
                  py: 1.4,
                  textTransform: 'none',
                  fontWeight: 700,
                  borderColor: 'var(--pv-muted)',
                  color: '#374151',
                }}
              >
                Retour au panier
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Checkout;
