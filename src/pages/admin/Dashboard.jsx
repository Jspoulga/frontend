import React, { useEffect, useState } from 'react';

import {
  Typography,
  Box,
  Paper,
  Stack,
} from '@mui/material';

import {
  ShoppingCartOutlined,
  PeopleOutlined,
  PaymentsOutlined,
  Inventory2,
} from '@mui/icons-material';

import StatsCard from '../../components/admin/StatsCard';
import adminService from '../../services/adminService';
import formatCurrency from '../../utils/formatCurrency';
import { readApiError } from '../../services/api';

const STATUS_LABELS = {
  pending: 'en attente',
  confirmed: 'confirmée',
  shipped: 'expédiée',
  delivered: 'livrée',
  cancelled: 'annulée',
};

function Dashboard() {
  /* Ces chiffres étaient écrits en dur : ils viennent maintenant de l'API. */
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    adminService
      .stats()
      .then(setStats)
      .catch(loadError =>
        setError(readApiError(loadError, 'Statistiques indisponibles.')),
      );
  }, []);

  return (
    <>
      <Typography
        variant="h3"
        fontWeight={900}
      >
        Dashboard
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mt: 1, mb: 4 }}
      >
        Vue générale de votre boutique.
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            lg: 'repeat(4, 1fr)',
          },
          gap: 3,
        }}
      >
        <StatsCard
          title="Ventes"
          value={stats ? formatCurrency(stats.revenue) : '…'}
          icon={<PaymentsOutlined />}
        />

        <StatsCard
          title="Commandes"
          value={stats ? String(stats.orders) : '…'}
          icon={<ShoppingCartOutlined />}
        />

        <StatsCard
          title="Clients"
          value={stats ? String(stats.customers) : '…'}
          icon={<PeopleOutlined />}
        />

        <StatsCard
          title="Produits"
          value={stats ? String(stats.products) : '…'}
          icon={<Inventory2 />}
        />
      </Box>

      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography
          variant="h6"
          fontWeight={800}
        >
          Activité récente
        </Typography>

        <Stack
          spacing={2}
          sx={{ mt: 3 }}
        >
          {error && (
            <Typography color="error" sx={{ fontSize: '0.85rem' }}>
              {error}
            </Typography>
          )}

          {!error && stats?.lastOrders?.length === 0 && (
            <Typography color="text.secondary">
              Aucune commande pour le moment.
            </Typography>
          )}

          {stats?.lastOrders?.map(order => (
            <Typography key={order.id} color="text.secondary">
              Commande {order.id} — {formatCurrency(order.total)} —{' '}
              {STATUS_LABELS[order.status] || order.status}
            </Typography>
          ))}
        </Stack>
      </Paper>
    </>
  );
}

export default Dashboard;