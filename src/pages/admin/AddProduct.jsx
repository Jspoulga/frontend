import React, { useState } from 'react';

import {
  Typography,
  Paper,
  TextField,
  Button,
  Stack,
} from '@mui/material';

import {
  useNavigate,
} from 'react-router-dom';

import productService from '../../services/productService';

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] =
    useState({
      name: '',
      category: '',
      price: '',
      image: '',
      description: '',
    });

  const update = field => e => {
    setForm({
      ...form,
      [field]: e.target.value,
    });
  };

  const submit = async e => {
    e.preventDefault();

    await productService.createProduct(
      form
    );

    navigate('/admin/products');
  };

  return (
    <>
      <Typography
        variant="h3"
        fontWeight={900}
        mb={4}
      >
        Ajouter un produit
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
            type="number"
            value={form.price}
            onChange={update('price')}
          />

          <TextField
            label="URL de l'image"
            value={form.image}
            onChange={update('image')}
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
            Ajouter le produit
          </Button>
        </Stack>
      </Paper>
    </>
  );
}

export default AddProduct;