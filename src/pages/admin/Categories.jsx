import React from 'react';

import {
  Typography,
  Paper,
  Stack,
  Button,
} from '@mui/material';

const categories = [
  'Hommes',
  'Femmes',
  'Chaussures',
  'Accessoires',
  'Enfants',
];

function Categories() {
  return (
    <>
      <Typography
        variant="h3"
        fontWeight={900}
        mb={4}
      >
        Catégories
      </Typography>

      <Paper sx={{ p: 3 }}>
        <Stack spacing={2}>
          {categories.map(category => (
            <Stack
              key={category}
              direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography fontWeight={600}>
                {category}
              </Typography>

              <Button>
                Modifier
              </Button>
            </Stack>
          ))}
        </Stack>
      </Paper>
    </>
  );
}

export default Categories;