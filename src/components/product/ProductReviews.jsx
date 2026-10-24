import React, { useCallback, useEffect, useState } from 'react';

import {
  Alert,
  Box,
  Button,
  Collapse,
  LinearProgress,
  Rating,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { StarRounded, VerifiedRounded } from '@mui/icons-material';
import { AnimatePresence, motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import api, { readApiError } from '../../services/api';

/*
 * ------------------------------------------------------------------
 * Avis d'un article
 * ------------------------------------------------------------------
 *
 * Lecture publique, dépôt réservé aux comptes. Le serveur marque
 * `verified` les avis dont l'auteur a réellement acheté l'article :
 * c'est la distinction qui sépare un avis utile d'un avis de
 * complaisance, et elle est affichée telle quelle.
 *
 * Un seul avis par personne et par article — le serveur le refuse,
 * l'interface l'explique plutôt que d'afficher une erreur brute.
 */

const T = {
  ink: 'var(--pv-ink)',
  body: 'var(--pv-body)',
  muted: 'var(--pv-muted)',
  line: 'var(--pv-line)',
  surface: 'var(--pv-surface)',
  surfaceAlt: 'var(--pv-surface-alt)',
};

function initialsOf(value) {
  return String(value || '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map(part => part.charAt(0).toUpperCase())
    .join('');
}

export default function ProductReviews({ productId }) {
  const user = useSelector(state => state.auth.user);

  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({ average: 0, count: 0, distribution: {} });
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const load = useCallback(async () => {
    try {
      const { data } = await api.get(`/reviews/product/${productId}`);

      setReviews(Array.isArray(data.reviews) ? data.reviews : []);
      setSummary(data.summary || { average: 0, count: 0, distribution: {} });
    } catch (loadError) {
      /* Les avis ne doivent jamais empêcher d'afficher la fiche. */
      setReviews([]);
    }

    setLoading(false);
  }, [productId]);

  useEffect(() => {
    load();
  }, [load]);

  const alreadyReviewed = reviews.some(
    review => user && String(review.userId) === String(user.id),
  );

  const submit = async event => {
    event.preventDefault();

    setError('');
    setSending(true);

    try {
      await api.post(`/reviews/product/${productId}`, { rating, comment });

      setSent(true);
      setComment('');
      await load();
    } catch (submitError) {
      const code = submitError?.response?.data?.message;

      setError(
        code === 'REVIEW_ALREADY_EXISTS'
          ? 'Vous avez déjà donné votre avis sur cet article.'
          : readApiError(submitError, 'Envoi impossible.'),
      );
    }

    setSending(false);
  };

  return (
    <Box sx={{ mt: { xs: 5, md: 7 } }}>
      <Typography
        sx={{
          fontSize: { xs: 22, md: 28 },
          fontWeight: 900,
          letterSpacing: '-.02em',
          color: T.ink,
          mb: 2.5,
        }}
      >
        Avis des clients
      </Typography>

      {/* Synthèse : note moyenne et répartition par étoile. */}
      {summary.count > 0 ? (
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2.5, sm: 5 }}
          sx={{
            p: { xs: 2.5, md: 3 },
            borderRadius: '20px',
            bgcolor: T.surfaceAlt,
            mb: 3,
            alignItems: { sm: 'center' },
          }}
        >
          <Box sx={{ textAlign: { xs: 'left', sm: 'center' }, minWidth: 120 }}>
            <Typography sx={{ fontSize: 42, fontWeight: 900, color: T.ink, lineHeight: 1 }}>
              {summary.average}
            </Typography>

            <Rating value={summary.average} precision={0.1} readOnly size="small" sx={{ mt: 0.5 }} />

            <Typography sx={{ fontSize: 12.5, color: T.muted, mt: 0.3 }}>
              {summary.count} avis
            </Typography>
          </Box>

          <Stack spacing={0.6} sx={{ flex: 1, width: '100%' }}>
            {[5, 4, 3, 2, 1].map(star => {
              const count = summary.distribution?.[star] || 0;
              const percent = summary.count ? (count / summary.count) * 100 : 0;

              return (
                <Stack key={star} direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <Typography sx={{ fontSize: 12.5, color: T.muted, width: 12 }}>{star}</Typography>

                  <StarRounded sx={{ fontSize: 14, color: '#F59E0B' }} />

                  <LinearProgress
                    variant="determinate"
                    value={percent}
                    sx={{
                      flex: 1,
                      height: 6,
                      borderRadius: 999,
                      bgcolor: 'var(--pv-line)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 999,
                        bgcolor: 'var(--pv-accent)',
                      },
                    }}
                  />

                  <Typography sx={{ fontSize: 12, color: T.muted, width: 20, textAlign: 'right' }}>
                    {count}
                  </Typography>
                </Stack>
              );
            })}
          </Stack>
        </Stack>
      ) : null}

      {/* Dépôt d'un avis */}
      {!user ? (
        <Alert severity="info" sx={{ borderRadius: '14px', mb: 3 }}>
          <Link to="/login" style={{ fontWeight: 700 }}>Connectez-vous</Link> pour
          donner votre avis sur cet article.
        </Alert>
      ) : alreadyReviewed || sent ? (
        <Alert severity="success" sx={{ borderRadius: '14px', mb: 3 }}>
          Merci, votre avis est publié.
        </Alert>
      ) : (
        <Box
          component="form"
          onSubmit={submit}
          sx={{
            p: { xs: 2.5, md: 3 },
            borderRadius: '20px',
            border: `1px solid ${T.line}`,
            mb: 3,
            maxWidth: 560,
          }}
        >
          <Typography sx={{ fontWeight: 800, color: T.ink, mb: 1.5 }}>
            Votre avis
          </Typography>

          <Collapse in={Boolean(error)}>
            <Alert severity="error" sx={{ mb: 2, borderRadius: '12px', fontSize: '0.84rem' }}>
              {error}
            </Alert>
          </Collapse>

          <Rating
            value={rating}
            onChange={(_event, next) => setRating(next || 1)}
            size="large"
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            multiline
            minRows={3}
            label="Votre commentaire"
            placeholder="La taille, la matière, la livraison…"
            value={comment}
            onChange={event => setComment(event.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={sending}
            sx={{ mt: 2, fontWeight: 700 }}
          >
            {sending ? 'Envoi…' : 'Publier mon avis'}
          </Button>
        </Box>
      )}

      {/* Liste */}
      {loading ? null : reviews.length === 0 ? (
        <Typography sx={{ color: T.muted, fontSize: 14.5 }}>
          Aucun avis pour le moment. Soyez le premier à en donner un.
        </Typography>
      ) : (
        <Stack spacing={2}>
          <AnimatePresence initial={false}>
            {reviews.map((review, index) => (
              <Box
                key={review.id}
                component={motion.div}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(index, 6) * 0.05 }}
                sx={{
                  p: { xs: 2, md: 2.5 },
                  borderRadius: '18px',
                  border: `1px solid ${T.line}`,
                  bgcolor: T.surface,
                }}
              >
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 1 }}>
                  <Box
                    sx={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      display: 'grid',
                      placeItems: 'center',
                      background: 'linear-gradient(135deg, #EC4899, #A855F7)',
                      color: '#fff',
                      fontWeight: 800,
                      fontSize: 13,
                    }}
                  >
                    {initialsOf(review.authorName)}
                  </Box>

                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" spacing={0.6} sx={{ alignItems: 'center' }}>
                      <Typography sx={{ fontSize: 14.5, fontWeight: 700, color: T.ink }}>
                        {review.authorName}
                      </Typography>

                      {/* Achat vérifié : c'est ce qui donne du poids à l'avis. */}
                      {review.verified ? (
                        <Stack direction="row" spacing={0.3} sx={{ alignItems: 'center' }}>
                          <VerifiedRounded sx={{ fontSize: 15, color: 'var(--pv-success)' }} />
                          <Typography sx={{ fontSize: 11.5, color: 'var(--pv-success)', fontWeight: 700 }}>
                            Achat vérifié
                          </Typography>
                        </Stack>
                      ) : null}
                    </Stack>

                    <Rating value={review.rating} readOnly size="small" />
                  </Box>

                  <Typography sx={{ fontSize: 12, color: T.muted }}>
                    {new Date(review.createdAt).toLocaleDateString('fr-CD', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </Typography>
                </Stack>

                {review.comment ? (
                  <Typography sx={{ fontSize: 14.5, color: T.body, lineHeight: 1.6 }}>
                    {review.comment}
                  </Typography>
                ) : null}
              </Box>
            ))}
          </AnimatePresence>
        </Stack>
      )}
    </Box>
  );
}
