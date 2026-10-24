import React from 'react';

import {
  Typography,
  Paper,
  Stack,
  Rating,
  Button,
} from '@mui/material';

const reviews = [
  {
    id: 1,
    user: 'Sarah',
    product: 'Elegant Women Dress',
    rating: 5,
  },
  {
    id: 2,
    user: 'Patrick',
    product: 'Classic Sneakers',
    rating: 4,
  },
];

function Reviews() {
  return (
    <>
      <Typography
        variant="h3"
        fontWeight={900}
        mb={4}
      >
        Avis clients
      </Typography>

      <Stack spacing={2}>
        {reviews.map(review => (
          <Paper
            key={review.id}
            sx={{ p: 3 }}
          >
            <Typography fontWeight={700}>
              {review.user}
            </Typography>

            <Typography
              color="text.secondary"
            >
              {review.product}
            </Typography>

            <Rating
              value={review.rating}
              readOnly
              sx={{ my: 1 }}
            />

            <Button
              color="error"
              size="small"
            >
              Supprimer
            </Button>
          </Paper>
        ))}
      </Stack>
    </>
  );
}

export default Reviews;