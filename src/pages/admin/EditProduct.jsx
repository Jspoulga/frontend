import React, { useEffect, useState } from 'react';

import {
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
} from '@mui/material';

import {
  useNavigate,
  useParams,
} from 'react-router-dom';

import productService from '../../services/productService';

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] =
    useState(null);

  useEffect(() => {
    productService
      .getProduct(id)
      .then(data => setForm(data));
  }, [id]);

  if (!form) {
    return (
      <Typography>
        Chargement...
      </Typography>
    );
  }

  const update = field => e => {
    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  const submit = e => {
    e.preventDefault();

    navigate('/admin/products');
  };

  return (
    <>
      <Typography
        variant="h3"
        fontWeight={900}
        mb={4}
      >
        Modifier le produit
      </Typography>

      <Paper
        component="form"
        onSubmit={submit}
        sx={{
          p: 4,
          maxWidth: 700,
        }}
      >
        <Stack spacing={2}>
          <TextField
            label="Nom"
            value={form.name}
            onChange={update('name')}
          />

          <TextField
            label="Catégorie"
            value={form.category}
            onChange={update('category')}
          />

          <TextField
            label="Prix"
            value={form.price}
            onChange={update('price')}
          />

          <TextField
            label="Description"
            multiline
            rows={4}
            value={form.description}
            onChange={update('description')}
          />

          <Button
            type="submit"
            variant="contained"
          >
            Enregistrer
          </Button>
        </Stack>
      </Paper>
    </>
  );
}

export default EditProduct;