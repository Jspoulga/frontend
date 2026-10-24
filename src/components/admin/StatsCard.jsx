import React from 'react';

import {
  Paper,
  Typography,
  Stack,
} from '@mui/material';

function StatsCard({
  title,
  value,
  icon,
}) {
  return (
    <Paper sx={{ p: 3 }}>
      <Stack
        direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {title}
          </Typography>

          <Typography
            variant="h4"
            fontWeight={900}
            sx={{ mt: 1 }}
          >
            {value}
          </Typography>
        </div>

        {icon}
      </Stack>
    </Paper>
  );
}

export default StatsCard;